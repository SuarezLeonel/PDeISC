/**
 * Módulo de servicio API
 * 
 * Este módulo contiene funciones para enviar datos a la API pública de JSONPlaceholder
 * usando tanto Fetch API como Axios (método POST).
 */

// URL base de la API pública
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Envía datos de usuario usando Fetch API (método POST)
 * 
 * @param {Object} userData - Datos del usuario a enviar
 * @returns {Promise<Object>} Respuesta de la API
 * @throws {Error} Si hay un error en la solicitud
 */
export async function postUserWithFetch(userData) {
  try {
    // Realizar solicitud POST con Fetch
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    // Verificar si la respuesta es exitosa
    if (!response.ok) throw new Error('Error en la solicitud POST Fetch');
    // Convertir respuesta a JSON y devolverla
    return await response.json();
  } catch (error) {
    console.error('Fetch POST Error:', error);
    throw error;
  }
}

/**
 * Envía datos de usuario usando Axios (método POST)
 * 
 * @param {Object} userData - Datos del usuario a enviar
 * @returns {Promise<Object>} Respuesta de la API
 * @throws {Error} Si hay un error en la solicitud
 */
export async function postUserWithAxios(userData) {
  try {
    // Realizar solicitud POST con Axios
    const response = await axios.post(API_URL, userData);
    // Devolver los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Axios POST Error:', error);
    throw error;
  }
}
