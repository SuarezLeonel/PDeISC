/**
 * Módulo de servicio API
 * 
 * Este módulo contiene funciones para interactuar con la API pública de JSONPlaceholder
 * usando tanto Fetch API como Axios.
 */

// URL base de la API pública
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Obtiene la lista de usuarios usando Fetch API
 * 
 * @returns {Promise<Array>} Lista de usuarios
 * @throws {Error} Si hay un error en la solicitud
 */
export async function fetchUsersWithFetch() {
  try {
    // Realizar solicitud GET
    const response = await fetch(API_URL);
    // Verificar si la respuesta es exitosa
    if (!response.ok) throw new Error('Error en la solicitud Fetch');
    // Convertir respuesta a JSON y devolverla
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

/**
 * Obtiene la lista de usuarios usando Axios
 * 
 * @returns {Promise<Array>} Lista de usuarios
 * @throws {Error} Si hay un error en la solicitud
 */
export async function fetchUsersWithAxios() {
  try {
    // Realizar solicitud GET con Axios
    const response = await axios.get(API_URL);
    // Devolver los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error);
    throw error;
  }
}
