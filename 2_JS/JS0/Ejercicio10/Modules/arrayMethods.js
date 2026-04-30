// Ejercicio 10: .map()

export const multiplicarPorTres = (arr) => {
    return arr.map(n => n * 3);
};

export const convertirAMayusculas = (arr) => {
    return arr.map(nombre => nombre.toUpperCase());
};

export const aplicarIVA = (arr) => {
    return arr.map(precio => (precio * 1.21).toFixed(2));
};
