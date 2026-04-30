// Ejercicio 12: .reduce()

// Retorna la suma de todos los números del array
export const sumarTodo = (arr) => {
    return arr.reduce((acc, num) => acc + num, 0);
};

// Retorna el producto de todos los números del array
export const multiplicarTodo = (arr) => {
    return arr.reduce((acc, num) => acc * num, 1);
};

// Retorna la suma total de los precios de una lista de objetos
export const obtenerTotalPrecios = (arr) => {
    return arr.reduce((acc, p) => acc + p.precio, 0);
};
