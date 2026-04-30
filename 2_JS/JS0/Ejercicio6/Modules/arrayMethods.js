// Ejercicio 6: .slice()

export const copiarPrimerosTres = (arr) => {
    return arr.slice(0, 3);
};

export const copiarPeliculasParcial = (arr) => {
    return arr.slice(2, 5); // Desde 2 hasta 4 (el 5 no se incluye)
};

export const copiarUltimosTres = (arr) => {
    return arr.slice(-3);
};
