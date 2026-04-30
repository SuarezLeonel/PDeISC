// Ejercicio 7: .indexOf()

export const buscarPerro = (arr) => {
    return arr.indexOf('perro');
};

export const buscarNumero50 = (arr) => {
    return arr.indexOf(50);
};

export const buscarCiudad = (arr, ciudad) => {
    const idx = arr.indexOf(ciudad);
    return idx !== -1 ? `La ciudad "${ciudad}" está en el índice ${idx}` : `La ciudad "${ciudad}" no se encuentra en el array`;
};
