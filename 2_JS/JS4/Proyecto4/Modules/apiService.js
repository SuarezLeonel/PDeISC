/**
 * Módulo de servicio API
 * 
 * Este módulo contiene funciones para interactuar con nuestra API propia
 * usando tanto Fetch API como Axios.
 */

// URL base de nuestra API propia (mismo servidor)
const API_URL = '/api/alumnos';

/**
 * Obtiene la lista de alumnos usando Fetch API
 */
export async function fetchAlumnosWithFetch() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error en la solicitud Fetch');
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

/**
 * Obtiene la lista de alumnos usando Axios
 */
export async function fetchAlumnosWithAxios() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error);
    throw error;
  }
}
