// Ejercicio 9: .forEach()

// Ejecuta un callback para cada nombre del array
export const saludarNombres = (arr, callback) => {
    arr.forEach(nombre => callback(`¡Hola, ${nombre}!`));
};

// Ejecuta un callback con el doble de cada número del array
export const duplicarNumeros = (arr, callback) => {
    arr.forEach(num => callback(num * 2));
};

// Ejecuta un callback con los detalles de cada usuario
export const mostrarUsuarios = (arr, callback) => {
    arr.forEach(u => callback(`Usuario: ${u.nombre}, Edad: ${u.edad}`));
};
