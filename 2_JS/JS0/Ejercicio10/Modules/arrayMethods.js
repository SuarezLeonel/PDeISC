// Ejercicio 10: .map()

// Retorna un nuevo array con cada número multiplicado por 3
export const multiplicarPorTres = (arr) => {
    return arr.map(num => num * 3);
};

// Retorna un nuevo array con todos los nombres en mayúsculas
export const convertirAMayusculas = (arr) => {
    return arr.map(nombre => nombre.toUpperCase());
};

// Retorna un nuevo array de precios con el 21% de IVA aplicado
export const aplicarIVA = (arr) => {
    return arr.map(precio => precio * 1.21);
};
