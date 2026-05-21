/**
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
