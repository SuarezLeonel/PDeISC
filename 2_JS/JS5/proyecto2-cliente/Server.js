/**
 * @file Server.js
 * @description Servidor Express simple para servir archivos estáticos del cliente
 * @module Server
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Obtiene la ruta del directorio actual usando ES Modules
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Instancia de la aplicación Express
 */
const app = express();

/**
 * Puerto en el que se ejecutará el servidor
 * @constant {number}
 */
const PORT = 4001;

/**
 * Middleware para servir archivos estáticos
 */
app.use(express.static(path.join(__dirname)));

/**
 * Ruta principal - Sirve la página de inicio
 * @route GET /
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Pages', 'index.html'));
});

/**
 * Inicia el servidor en el puerto especificado
 */
app.listen(PORT, () => {
  console.log(`Servidor Proyecto 2 (Cliente) corriendo en http://localhost:${PORT}`);
});
