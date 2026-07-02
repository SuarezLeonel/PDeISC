/**
 * Servidor Express para Proyecto 1
 * 
 * Este servidor sirve los archivos estáticos del proyecto y
 * maneja las rutas básicas.
 */

// Importar módulos necesarios
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar __dirname para ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear instancia de Express
const app = express();

// Puerto donde se ejecutará el servidor
const PORT = 3004;

// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Ruta principal: servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Proyecto 1 corriendo en http://localhost:${PORT}`);
});
