// Ejercicio 11: .filter()

export const filtrarMayoresA10 = (arr) => {
    return arr.filter(n => n > 10);
};

export const filtrarPalabrasLargas = (arr) => {
    return arr.filter(palabra => palabra.length > 5);
};

export const filtrarUsuariosActivos = (arr) => {
    return arr.filter(user => user.activo === true);
};
