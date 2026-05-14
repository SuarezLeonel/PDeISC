import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import { getFactorialBase, hasSameStartAndEndDigit } from './Modules/mathHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Configuración de Multer para subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Validación 1: Solo .txt
        if (path.extname(file.originalname).toLowerCase() !== '.txt') {
            return cb(new Error('Solo se permiten archivos .txt'));
        }
        cb(null, true);
    }
});

app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use('/Pages', express.static(path.join(__dirname, 'Pages')));
app.use('/Scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/Styles', express.static(path.join(__dirname, 'Styles')));
app.use('/Modules', express.static(path.join(__dirname, 'Modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'index.html'));
});

/**
 * Endpoint para listar archivos en la carpeta /results
 */
app.get('/api/server-files', (req, res) => {
    console.log('Petición recibida en /api/server-files');
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) {
        console.log('Directorio results no existe');
        return res.json({ success: true, files: [] });
    }

    try {
        const files = fs.readdirSync(resultsDir)
            .filter(file => file.endsWith('.txt'))
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(resultsDir, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time); // Más recientes primero

        console.log('Archivos encontrados:', files.length);
        res.json({ success: true, files: files.map(f => f.name) });
    } catch (error) {
        console.error('Error en /api/server-files:', error);
        res.status(500).json({ success: false, message: 'Error al listar archivos.' });
    }
});

/**
 * Endpoint para procesar un archivo que ya está en el servidor
 */
app.post('/api/process-server-file', (req, res) => {
    const { fileName } = req.body;
    if (!fileName) {
        return res.status(400).json({ success: false, message: 'No se especificó el archivo.' });
    }

    const filePath = path.join(__dirname, 'results', fileName);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'El archivo no existe en el servidor.' });
    }

    try {
        console.log(`Intentando leer archivo: ${filePath}`);
        // Verificar permisos antes de leer
        fs.accessSync(filePath, fs.constants.R_OK);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = processContent(content);
        res.json({ success: true, data });
    } catch (error) {
        console.error(`Error al procesar archivo del servidor: ${error.message}`);
        res.status(500).json({ 
            success: false, 
            message: `Error de permisos o lectura: ${error.message}. Asegúrese de que el archivo no esté abierto en otro programa.` 
        });
    }
});

/**
 * Endpoint para procesar el archivo subido
 */
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No se subió ningún archivo.' });
    }

    try {
        const filePath = req.file.path;
        const content = fs.readFileSync(filePath, 'utf8');
        const data = processContent(content);
        
        // El archivo subido se puede eliminar después de procesar si se desea, 
        // pero aquí lo mantenemos en 'uploads' según la lógica original.
        res.json({ success: true, data });

    } catch (error) {
        console.error('Error procesando archivo:', error);
        res.status(500).json({ success: false, message: error.message || 'Error interno al procesar el archivo.' });
    }
});

/**
 * Lógica común de procesamiento de contenido
 */
function processContent(content) {
    // Si el contenido parece ser un reporte (contiene "DETALLE DE NÚMEROS ÚTILES"),
    // intentamos extraer solo los números originales si es posible, 
    // o lanzamos un error sugiriendo usar el archivo de "solo números".
    if (content.includes('RESULTADOS DEL PROCESAMIENTO')) {
        throw new Error('Estás intentando procesar un archivo de RESULTADOS. Por favor, selecciona un archivo que contenga solo números (como los archivos "numeros_..." o "solo_numeros_...").');
    }

    // Dividir por espacios, saltos de línea o comas y filtrar vacíos
    const lines = content.split(/[\s\n,]+/).filter(l => l.trim() !== '');

    // Validación: Solo números reales
    const allNumbers = lines.every(line => !isNaN(parseFloat(line)) && isFinite(line));
    
    if (!allNumbers) {
        throw new Error('El archivo contiene caracteres no numéricos. Solo se aceptan números reales.');
    }

    const numbers = lines.map(Number);
    const totalCount = numbers.length;

    // Filtrado y Cálculos
    const usefulNumbers = numbers.filter(n => hasSameStartAndEndDigit(n));
    const discardedCount = totalCount - usefulNumbers.length;
    const usefulPercentage = totalCount > 0 ? ((usefulNumbers.length / totalCount) * 100).toFixed(2) : 0;
    
    // Ordenar ascendente para el frontend
    const sortedUseful = [...usefulNumbers].sort((a, b) => a - b);

    // Identificar factoriales en la lista total y su base
    const results = numbers.map(n => {
        const factorialBase = getFactorialBase(n);
        return {
            val: n,
            isUseful: hasSameStartAndEndDigit(n),
            isFactorial: factorialBase !== null,
            factorialBase: factorialBase
        };
    });

    // Guardar Reporte Completo en Servidor y Ruta Local
    saveResults(results, totalCount, usefulNumbers.length, discardedCount, usefulPercentage);

    // Guardar el archivo de "solo números útiles" estrictamente en el servidor
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);
    
    const fileNameOnlyNumbers = `solo_numeros_${Date.now()}.txt`;
    const pathOnlyNumbers = path.join(resultsDir, fileNameOnlyNumbers);
    const downloadContent = sortedUseful.join('\n');
    
    fs.writeFileSync(pathOnlyNumbers, downloadContent, 'utf8');

    return {
        totalCount,
        usefulCount: usefulNumbers.length,
        discardedCount,
        usefulPercentage,
        sortedUseful,
        allDetails: results,
        downloadContent: downloadContent
    };
}

/**
 * Guarda los resultados en dos ubicaciones
 */
function saveResults(results, total, useful, discarded, percentage) {
    const report = `
RESULTADOS DEL PROCESAMIENTO
----------------------------
Total de números: ${total}
Números útiles (regla inicio/fin): ${useful}
Números descartados: ${discarded}
Porcentaje de utilidad: ${percentage}%

DETALLE DE NÚMEROS ÚTILES:
${results.filter(r => r.isUseful).map(r => r.val).join(', ')}

DETALLE DE NÚMEROS FACTORIALES:
${results.filter(r => r.isFactorial).map(r => r.val).join(', ')}
    `.trim();

    const fileName = `resultado_${Date.now()}.txt`;
    
    // Ubicación A: Interna (/results)
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);
    fs.writeFileSync(path.join(resultsDir, fileName), report);

    // Ubicación B: Externa (C:\Users\Leito\Desktop\DescargaDeTXT)
    const externalPath = "C:\\Users\\Leito\\Desktop\\DescargaDeTXT";
    if (!fs.existsSync(externalPath)) {
        fs.mkdirSync(externalPath, { recursive: true });
    }
    fs.writeFileSync(path.join(externalPath, fileName), report);
}

// Manejador de errores de Multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === 'Solo se permiten archivos .txt') {
        return res.status(400).json({ success: false, message: err.message });
    }
    next(err);
});

app.listen(PORT, () => {
    console.log(`Servidor Proyecto 2 corriendo en http://localhost:${PORT}`);
});
