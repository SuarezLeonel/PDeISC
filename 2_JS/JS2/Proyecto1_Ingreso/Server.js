import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos con la estructura requerida
app.use('/Pages', express.static(path.join(__dirname, 'Pages')));
app.use('/Scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/Styles', express.static(path.join(__dirname, 'Styles')));
app.use('/Modules', express.static(path.join(__dirname, 'Modules')));

// Ruta principal para redirigir al index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'index.html'));
});

/**
 * Endpoint para guardar los números recibidos en un archivo .txt
 * Se realizan validaciones básicas de backend para asegurar la integridad de los datos.
 */
app.post('/api/save-numbers', (req, res) => {
    const { numbers } = req.body;

    // Validación de backend
    if (!Array.isArray(numbers) || numbers.length < 10 || numbers.length > 20) {
        return res.status(400).json({ 
            success: false, 
            message: 'Cantidad de números inválida. Debe ser entre 10 y 20.' 
        });
    }

    // Validar que todos sean números reales
    const allNumbers = numbers.every(n => !isNaN(parseFloat(n)) && isFinite(n));
    if (!allNumbers) {
        return res.status(400).json({ 
            success: false, 
            message: 'El array contiene valores que no son números válidos.' 
        });
    }

    try {
        const fileName = `numeros_${Date.now()}.txt`;
        
        // Crear directorio 'results' si no existe
        const resultsDir = path.join(__dirname, 'results');
        if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);
        
        const filePath = path.join(resultsDir, fileName);
        const content = numbers.join('\n');

        // Guardar el archivo físicamente en el servidor (directorio /results)
        fs.writeFileSync(filePath, content, 'utf8');

        // Configurar cabeceras para la descarga
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'text/plain');
        
        // Enviar el contenido al cliente
        return res.send(content);
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno al intentar guardar el archivo.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Proyecto 1 corriendo en http://localhost:${PORT}`);
});
