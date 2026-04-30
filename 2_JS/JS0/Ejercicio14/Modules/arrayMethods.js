// Ejercicio 14: .reverse()

// Invierte el orden de los elementos del array de letras
export const invertirLetras = (arr) => {
    return [...arr].reverse();
};

// Invierte el orden de los elementos del array de números
export const invertirNumeros = (arr) => {
    return [...arr].reverse();
};

// Revierte un string convirtiéndolo en array, invirtiéndolo y uniéndolo de nuevo
export const revertirTexto = (str) => {
    return str.split('').reverse().join('');
};
