/**
 * Módulo para persistencia en LocalStorage
 */

const KEY = 'p3_registry';

/**
 * Guarda una persona en el localStorage
 */
export const savePerson = (person) => {
    const data = getAllPeople();
    data.push(person);
    localStorage.setItem(KEY, JSON.stringify(data));
};

/**
 * Obtiene todos los registros del localStorage
 */
export const getAllPeople = () => {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
};

/**
 * Borra todos los registros (opcional)
 */
export const clearAll = () => {
    localStorage.removeItem(KEY);
};