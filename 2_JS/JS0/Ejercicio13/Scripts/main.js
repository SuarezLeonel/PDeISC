import { ordenarNumerosAsc, ordenarPalabrasAlfa, ordenarUsuariosPorEdad } from '../Modules/arrayMethods.js';

// 1. Números
const nums = [40, 100, 1, 5, 25, 10];
const resNums = document.getElementById('res-nums');
const numsDisplay = document.getElementById('nums-display');

// Inicialización
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

document.getElementById('btn-nums').addEventListener('click', () => {
    const sorted = ordenarNumerosAsc(nums);
    resNums.innerText = `Resultado: ${JSON.stringify(sorted)}`;
});

// 2. Palabras
const words = ["Zebra", "Banana", "Manzana", "Ananá"];
const resWords = document.getElementById('res-words');
const wordsDisplay = document.getElementById('words-display');

// Inicialización
if (wordsDisplay) wordsDisplay.innerText = `Palabras: ${JSON.stringify(words)}`;

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

// Inicialización
if (usersDisplay) usersDisplay.innerText = `Usuarios: ${JSON.stringify(usuarios)}`;

document.getElementById('btn-users').addEventListener('click', () => {
    const sorted = ordenarUsuariosPorEdad(usuarios);
    resUsers.innerText = `Ordenados: ${JSON.stringify(sorted)}`;
});
