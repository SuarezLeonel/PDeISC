// Ejercicio 2: .pop()

// Elimina el último animal del array
export const eliminarUltimoAnimal = (arr) => {
    arr.pop();
    return [...arr];
};

// Elimina el último producto y retorna el nombre eliminado y el nuevo array
export const eliminarUltimoProducto = (arr) => {
    const eliminado = arr.pop();
    return { eliminado, newArr: [...arr] };
};

// Vacía el array completamente usando un bucle while y pop()
export const vaciarArrayConPop = (arr) => {
    const historial = [];
    while (arr.length > 0) {
        historial.push(arr.pop());
    }
    return { historial, newArr: [...arr] };
};
