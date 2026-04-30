// Ejercicio 11: .filter()

// Filtra los números que son mayores a 10
export const filtrarMayoresA10 = (arr) => {
    return arr.filter(num => num > 10);
};

// Filtra las palabras que tienen más de 5 caracteres
export const filtrarPalabrasLargas = (arr) => {
    return arr.filter(palabra => palabra.length > 5);
};

// Filtra los usuarios que tienen la propiedad activo en true
export const filtrarUsuariosActivos = (arr) => {
    return arr.filter(u => u.activo);
};
