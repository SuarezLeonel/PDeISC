/**
 * Módulo de validación de datos
 * 
 * Este módulo contiene funciones para validar los datos del formulario.
 */

/**
 * Valida el nombre de usuario
 * 
 * @param {string} name - Nombre a validar
 * @returns {boolean} True si el nombre es válido, false en caso contrario
 * 
 * Reglas:
 * - Mínimo 2 caracteres
 * - Solo letras (incluyendo tildes y ñ) y espacios
 */
export function validateName(name) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
  return regex.test(name.trim());
}

/**
 * Valida el correo electrónico
 * 
 * @param {string} email - Correo electrónico a validar
 * @returns {boolean} True si el correo es válido, false en caso contrario
 * 
 * Reglas:
 * - Formato estándar de correo electrónico
 */
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}
