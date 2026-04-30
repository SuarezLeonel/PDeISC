// Ejercicio 9: .forEach()

export const saludarNombres = (arr, callback) => {
    arr.forEach(nombre => callback(`¡Hola, ${nombre}!`));
};

export const duplicarNumeros = (arr, callback) => {
    arr.forEach(num => callback(num * 2));
};

export const mostrarUsuarios = (arr, callback) => {
    arr.forEach(user => callback(`${user.nombre} tiene ${user.edad} años.`));
};
