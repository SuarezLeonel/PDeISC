/**
 * @file apiService.js
 * @description Módulo de servicio para consumir la API de alumnos
 * @module apiService
 */

/**
 * URL base de la API del Proyecto 1
 * @constant {string}
 */
const API_URL = 'http://localhost:4000/api/alumnos';

/**
 * Obtiene la lista de alumnos desde la API
 * @async
 * @function fetchAlumnos
 * @returns {Promise<Object>} Datos de la API con success y la lista de alumnos
 * @throws {Error} Si hay un error en la conexión o la respuesta no es OK
 */
export const fetchAlumnos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al conectar con la API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en apiService:', error);
    throw error;
  }
};
