// Ejercicio 4: .shift()

export const eliminarPrimerEntero = (arr) => {
    arr.shift();
    return [...arr];
};

export const eliminarPrimerMensaje = (arr) => {
    const eliminado = arr.shift();
    return { eliminado, newArr: [...arr] };
};

export const atenderCliente = (arr) => {
    const cliente = arr.shift();
    return { cliente, newArr: [...arr] };
};
