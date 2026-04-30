// Ejercicio 14: .reverse()

export const invertirLetras = (arr) => {
    return [...arr].reverse();
};

export const invertirNumeros = (arr) => {
    return [...arr].reverse();
};

export const revertirTexto = (str) => {
    // String -> Array -> Reverse -> String
    return str.split('').reverse().join('');
};
