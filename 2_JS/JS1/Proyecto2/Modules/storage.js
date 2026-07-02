/**
<<<<<<< HEAD
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
=======
 * Módulo de almacenamiento — Array de artículos deportivos
 * Demuestra distintos métodos para agregar elementos al array.
 */

let catalogo = [];

const generarId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const crearArticulo = (datos, metodo) => ({
    id: generarId(),
    metodo,
    ...datos
});

/**
 * Método 1: push() — agrega al final del array.
 */
export const agregarConPush = (item) => {
    const articulo = crearArticulo(item, 'push');
    catalogo.push(articulo);
    return [...catalogo];
};

/**
 * Método 2: unshift() — agrega al inicio del array.
 */
export const agregarConUnshift = (item) => {
    const articulo = crearArticulo(item, 'unshift');
    catalogo.unshift(articulo);
    return [...catalogo];
};

/**
 * Método 3: Spread operator [...] — nuevo array sin mutar el original directamente.
 */
export const agregarConSpread = (item) => {
    const articulo = crearArticulo(item, 'spread');
    catalogo = [articulo, ...catalogo];
    return [...catalogo];
};

/**
 * Método 4: concat() — concatena un nuevo elemento generando un array combinado.
 */
export const agregarConConcat = (item) => {
    const articulo = crearArticulo(item, 'concat');
    catalogo = catalogo.concat([articulo]);
    return [...catalogo];
};

/**
 * Elimina un artículo por ID usando filter().
 */
export const eliminarPorId = (id) => {
    catalogo = catalogo.filter((item) => item.id !== id);
    return [...catalogo];
};

/**
 * Filtra por nombre, código o deporte.
 */
export const filtrarCatalogo = (consulta) => {
    const q = consulta.trim().toLowerCase();
    if (!q) return [...catalogo];

    return catalogo.filter(
        (item) =>
            item.nombre.toLowerCase().includes(q) ||
            item.codigo.toLowerCase().includes(q) ||
            item.deporte.toLowerCase().includes(q) ||
            item.marca.toLowerCase().includes(q)
    );
};

export const obtenerCatalogo = () => [...catalogo];

export const contarArticulos = () => catalogo.length;
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
