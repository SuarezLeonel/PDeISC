import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3006;

app.use('/Scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/Styles', express.static(path.join(__dirname, 'Styles')));
app.use('/Modules', express.static(path.join(__dirname, 'Modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Ejercicio 6 ejecutándose en http://localhost:${PORT}`);
});
