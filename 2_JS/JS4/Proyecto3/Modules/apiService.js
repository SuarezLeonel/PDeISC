/**
 * Módulo de servicio API
 * 
 * Este módulo contiene funciones para interactuar con la API pública de JSONPlaceholder
 * y para filtrar usuarios por nombre o email.
 */

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Obtiene la lista de usuarios usando Fetch API
 */
export async function fetchAllUsersWithFetch() {
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
 * Obtiene la lista de usuarios usando Axios
 */
export async function fetchAllUsersWithAxios() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Axios Error:', error);
    throw error;
  }
}

/**
 * Filtra la lista de usuarios por nombre o email
 * 
 * @param {Array} users - Lista completa de usuarios
 * @param {string} query - Texto de búsqueda
 * @returns {Array} Lista de usuarios que coinciden con la búsqueda
 */
export function filterUsers(users, query) {
  // Si no hay texto de búsqueda, devolver todos los usuarios
  if (!query.trim()) return users;
  
  // Convertir búsqueda a minúsculas para búsqueda insensible a mayúsculas
  const lowerQuery = query.toLowerCase();
  
  // Filtrar usuarios que coincidan en nombre o email
  return users.filter(user => 
    user.name.toLowerCase().includes(lowerQuery) || 
    user.email.toLowerCase().includes(lowerQuery)
  );
}
