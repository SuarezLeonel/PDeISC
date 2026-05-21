// Ejercicio en clase: saludo con nombre por argumentos
const nombre = process.argv[2] ?? 'estudiante';

console.log(`Hola, ${nombre}!`);
console.log('Bienvenido al curso de Node.js');
