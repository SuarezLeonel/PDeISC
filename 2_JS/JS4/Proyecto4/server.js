/**
 * Servidor Express para Proyecto 4
 * 
 * Este servidor sirve los archivos estáticos y también proporciona
 * una API propia para obtener datos de alumnos.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3007;

// Servir archivos estáticos
app.use(express.static(__dirname));

// API propia: GET /api/alumnos
app.get('/api/alumnos', (req, res) => {
    try {
        // Leer datos desde el archivo JSON
        const data = readFileSync(path.join(__dirname, 'data', 'alumnos.json'), 'utf-8');
        const alumnos = JSON.parse(data);
        // Devolver datos como JSON
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer los datos' });
    }
});

// Ruta principal: servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Proyecto 4 corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api/alumnos`);
});
