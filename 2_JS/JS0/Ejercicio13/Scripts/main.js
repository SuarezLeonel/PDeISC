import { ordenarNumerosAsc, ordenarPalabrasAlfa, ordenarUsuariosPorEdad } from '../Modules/arrayMethods.js';

// 1. Números
const nums = [40, 100, 1, 5, 25, 10];
const resNums = document.getElementById('res-nums');
const numsDisplay = document.getElementById('nums-display');

// Inicialización de la UI
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

// Evento para ordenar los números de forma ascendente (sort)
document.getElementById('btn-nums').addEventListener('click', () => {
    const sorted = ordenarNumerosAsc(nums);
    resNums.innerText = `Resultado: ${JSON.stringify(sorted)}`;
});

// 2. Palabras
const words = ["Zebra", "Banana", "Manzana", "Ananá"];
const resWords = document.getElementById('res-words');
const wordsDisplay = document.getElementById('words-display');

// Inicialización de la UI
if (wordsDisplay) wordsDisplay.innerText = `Palabras: ${JSON.stringify(words)}`;

// Evento para ordenar las palabras alfabéticamente
document.getElementById('btn-words').addEventListener('click', () => {
    const sorted = ordenarPalabrasAlfa(words);
    resWords.innerText = `Resultado: ${JSON.stringify(sorted)}`;
});

// 3. Usuarios
const usuarios = [
    { nombre: 'Leo', edad: 25 },
    { nombre: 'Marta', edad: 32 },
    { nombre: 'Santi', edad: 19 },
    { nombre: 'Ana', edad: 45 }
];
const usersDisplay = document.getElementById('users-display');
const resUsers = document.getElementById('res-users');

// Inicialización de la UI
if (usersDisplay) usersDisplay.innerText = `Usuarios: ${JSON.stringify(usuarios)}`;

// Evento para ordenar objetos por una de sus propiedades numéricas (edad)
document.getElementById('btn-users').addEventListener('click', () => {
    const sorted = ordenarUsuariosPorEdad(usuarios);
    resUsers.innerText = `Ordenados: ${JSON.stringify(sorted)}`;
});
