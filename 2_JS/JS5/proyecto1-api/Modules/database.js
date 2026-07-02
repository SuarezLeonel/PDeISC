/**
 * @file database.js
 * @description Módulo de conexión y operaciones con la base de datos MySQL
 * @module database
 */

import mysql from 'mysql2/promise';

/**
 * Pool de conexiones MySQL para gestionar conexiones eficientemente
 * @constant {Pool}
 */
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'RXAE3t65hspbjdh',
  database: 'alumnosDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Obtiene todos los alumnos de la base de datos
 * @async
 * @function getAlumnos
 * @returns {Promise<Array>} Lista de alumnos
 */
export const getAlumnos = async () => {
  const [rows] = await pool.query('SELECT * FROM alumnos');
  return rows;
};

/**
 * Crea un nuevo alumno en la base de datos
 * @async
 * @function createAlumno
 * @param {string} nombre - Nombre del alumno
 * @param {string} apellido - Apellido del alumno
 * @param {number} edad - Edad del alumno
 * @returns {Promise<Object>} Datos del alumno creado con su ID
 */
export const createAlumno = async (nombre, apellido, edad) => {
  const [result] = await pool.query(
    'INSERT INTO alumnos (nombre, apellido, edad) VALUES (?, ?, ?)',
    [nombre, apellido, edad]
  );
  return { id: result.insertId, nombre, apellido, edad };
};

/**
 * Exporta el pool de conexiones por si se necesita usar directamente
 */
export default pool;
