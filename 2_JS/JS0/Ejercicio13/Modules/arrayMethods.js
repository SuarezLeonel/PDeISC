// Ejercicio 13: .sort()

// Ordena los números de menor a mayor
export const ordenarNumerosAsc = (arr) => {
    return [...arr].sort((a, b) => a - b);
};

// Ordena las palabras alfabéticamente (A-Z)
export const ordenarPalabrasAlfa = (arr) => {
    return [...arr].sort();
};

// Ordena los objetos de usuario por su edad de forma ascendente
export const ordenarUsuariosPorEdad = (arr) => {
    return [...arr].sort((a, b) => a.edad - b.edad);
};
