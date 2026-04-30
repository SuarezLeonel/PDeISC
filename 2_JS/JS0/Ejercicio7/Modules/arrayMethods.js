// Ejercicio 7: .indexOf()

// Retorna el índice de la palabra "perro" en el array
export const buscarPerro = (arr) => {
    return arr.indexOf("perro");
};

// Retorna el índice del número 50 en el array
export const buscarNumero50 = (arr) => {
    return arr.indexOf(50);
};

// Busca una ciudad en el array y retorna un mensaje con su posición o indicando que no existe
export const buscarCiudad = (arr, ciudad) => {
    const idx = arr.indexOf(ciudad);
    if (idx !== -1) {
        return `La ciudad ${ciudad} se encuentra en el índice ${idx}.`;
    }
    return `La ciudad ${ciudad} no se encuentra en el array.`;
};
