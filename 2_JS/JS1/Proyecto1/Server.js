import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware para JSON
app.use(express.json());

// Servir archivos estáticos
app.use('/Scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/Styles', express.static(path.join(__dirname, 'Styles')));
app.use('/Modules', express.static(path.join(__dirname, 'Modules')));
app.use('/Pages', express.static(path.join(__dirname, 'Pages')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Proyecto 1 ejecutándose en http://localhost:${PORT}`);
});