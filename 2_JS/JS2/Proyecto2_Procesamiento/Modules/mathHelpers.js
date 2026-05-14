/**
 * Módulo de Utilidades Matemáticas y Filtrado
 */

/**
 * Verifica si un número empieza y termina con el mismo dígito
 * Requisito adicional: Debe tener al menos 2 caracteres (dígitos)
 * @param {number|string} num 
 * @returns {boolean}
 */
export const hasSameStartAndEndDigit = (num) => {
    const s = Math.abs(parseFloat(num)).toString().replace('.', '');
    // Validación de longitud: mínimo 2 caracteres
    if (s.length < 2) return false;
    return s[0] === s[s.length - 1];
};

/**
 * Calcula el factorial de un número de forma iterativa
 * @param {number} n 
 * @returns {number|null}
 */
export const factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) return null;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
};

/**
 * Verifica si un número dado es un número factorial
 * Si lo es, devuelve el número base (x tal que x! = n)
 * Si no lo es, devuelve null
 * @param {number} n 
 * @returns {number|null}
 */
export const getFactorialBase = (n) => {
    if (n < 1 || !Number.isInteger(n)) return null;
    let i = 1;
    let f = 1;
    while (f < n) {
        i++;
        f *= i;
    }
    return f === n ? i : null;
};

/**
 * Verifica si un número dado es un número factorial
 * (es decir, si existe un 'x' tal que x! = n)
 * @param {number} n 
 * @returns {boolean}
 */
export const isFactorialNumber = (n) => {
    return getFactorialBase(n) !== null;
};
