/**
 * Módulo de Almacenamiento y Manipulación de Arrays
 */

let inventory = [];

/**
 * Genera un ID único para cada producto
 */
const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);

/**
 * Método 1: push()
 * Añade uno o más elementos al final del array.
 */
export const addToEnd = (item) => {
    const newItem = { id: generateId(), ...item };
    inventory.push(newItem);
    return [...inventory];
};

/**
 * Método 2: unshift()
 * Añade uno o más elementos al inicio del array.
 */
export const addToStart = (item) => {
    const newItem = { id: generateId(), ...item };
    inventory.unshift(newItem);
    return [...inventory];
};

/**
 * Método 3: Spread Operator [...]
 * Permite crear una copia del array añadiendo nuevos elementos de forma inmutable.
 */
export const addWithSpread = (item) => {
    const newItem = { id: generateId(), ...item };
    // Añadimos al inicio usando spread como ejemplo de inmutabilidad
    inventory = [newItem, ...inventory];
    return inventory;
};

/**
 * Elimina un producto por su ID usando filter()
 */
export const deleteById = (id) => {
    inventory = inventory.filter(item => item.id !== id);
    return [...inventory];
};

/**
 * Filtra el inventario por nombre o SKU
 */
export const filterInventory = (query) => {
    const q = query.toLowerCase();
    return inventory.filter(item => 
        item.productName.toLowerCase().includes(q) || 
        item.sku.toLowerCase().includes(q)
    );
};

/**
 * Obtiene el inventario actual
 */
export const getInventory = () => [...inventory];