// Ejercicio 12: .reduce()

export const sumarTodo = (arr) => {
    return arr.reduce((acc, val) => acc + val, 0);
};

export const multiplicarTodo = (arr) => {
    if (arr.length === 0) return 0;
    return arr.reduce((acc, val) => acc * val, 1);
};

export const obtenerTotalPrecios = (arr) => {
    return arr.reduce((acc, item) => acc + item.precio, 0);
};
