// Ejercicio 2: .pop()

export const eliminarUltimoAnimal = (arr) => {
    arr.pop();
    return [...arr];
};

export const eliminarUltimoProducto = (arr) => {
    const eliminado = arr.pop();
    return { eliminado, newArr: [...arr] };
};

export const vaciarArrayConPop = (arr) => {
    const historial = [];
    while (arr.length > 0) {
        const item = arr.pop();
        historial.push(item);
    }
    return { historial, newArr: [] };
};
