// Ejercicio 6: .slice()

// Retorna una copia de los primeros 3 elementos del array
export const copiarPrimerosTres = (arr) => {
    return arr.slice(0, 3);
};

// Retorna una copia parcial de películas (desde el índice 2 hasta el 4 sin incluirlo)
export const copiarPeliculasParcial = (arr) => {
    return arr.slice(2, 4);
};

// Retorna una copia de los últimos 3 elementos del array
export const copiarUltimosTres = (arr) => {
    return arr.slice(-3);
};
