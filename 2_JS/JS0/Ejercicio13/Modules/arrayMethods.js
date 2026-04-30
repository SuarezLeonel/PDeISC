// Ejercicio 13: .sort()

export const ordenarNumerosAsc = (arr) => {
    return [...arr].sort((a, b) => a - b);
};

export const ordenarPalabrasAlfa = (arr) => {
    return [...arr].sort();
};

export const ordenarUsuariosPorEdad = (arr) => {
    return [...arr].sort((a, b) => a.edad - b.edad);
};
