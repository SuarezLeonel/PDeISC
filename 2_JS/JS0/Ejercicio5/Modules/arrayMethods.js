// Ejercicio 5: .splice()

// Elimina 2 elementos desde la posición 1
export const eliminarLetras = (arr) => {
    arr.splice(1, 2);
    return [...arr];
};

// Inserta un nombre en la posición 1
export const insertarNombre = (arr, nombre) => {
    arr.splice(1, 0, nombre);
    return [...arr];
};

// Reemplaza 2 elementos en una posición dada con nuevos valores
export const reemplazarElementos = (arr, pos, n1, n2) => {
    arr.splice(pos, 2, n1, n2);
    return [...arr];
};
