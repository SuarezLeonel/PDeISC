/**
 * @file Server.js
 * @description Servidor Express para la API de Registro de Alumnos
 * @module Server
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAlumnos, createAlumno } from './Modules/database.js';

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
const PORT = 4000;

// Configuración de middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

/**
 * Endpoint GET /api/alumnos - Obtiene la lista de todos los alumnos
 * @route GET /api/alumnos
 * @returns {Object} Respuesta JSON con success y datos de alumnos
 */
app.get('/api/alumnos', async (req, res) => {
  try {
    const alumnos = await getAlumnos();
    res.json({ success: true, data: alumnos });
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

/**
 * Endpoint POST /api/alumnos - Crea un nuevo alumno en la base de datos
 * @route POST /api/alumnos
 * @param {Object} req.body - Datos del alumno
 * @param {string} req.body.nombre - Nombre del alumno
 * @param {string} req.body.apellido - Apellido del alumno
 * @param {number} req.body.edad - Edad del alumno
 * @returns {Object} Respuesta JSON con success y datos del nuevo alumno
 */
app.post('/api/alumnos', async (req, res) => {
  try {
    const { nombre, apellido, edad } = req.body;

    // Validación: campos obligatorios
    if (!nombre || !apellido || !edad) {
      return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    // Validación: edad debe ser entero positivo
    if (typeof edad !== 'number' || edad <= 0 || !Number.isInteger(edad)) {
      return res.status(400).json({ success: false, message: 'La edad debe ser un entero positivo' });
    }

    const nuevoAlumno = await createAlumno(nombre, apellido, edad);
    res.status(201).json({ success: true, data: nuevoAlumno });
  } catch (error) {
    console.error('Error al crear alumno:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

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
  console.log(`Servidor Proyecto 1 (API) corriendo en http://localhost:${PORT}`);
});
