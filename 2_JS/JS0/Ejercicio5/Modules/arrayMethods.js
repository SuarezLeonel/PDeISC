// Ejercicio 5: .splice()

export const eliminarLetras = (arr) => {
    arr.splice(1, 2);
    return [...arr];
};

export const insertarNombre = (arr, nombre) => {
    arr.splice(1, 0, nombre);
    return [...arr];
};

export const reemplazarElementos = (arr, pos, n1, n2) => {
    arr.splice(pos, 2, n1, n2);
    return [...arr];
};
