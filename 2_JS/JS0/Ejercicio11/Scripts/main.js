import { filtrarMayoresA10, filtrarPalabrasLargas, filtrarUsuariosActivos } from '../Modules/arrayMethods.js';

// 1. Números
const nums = [5, 12, 8, 130, 44, 2, 19];
const resNums = document.getElementById('res-nums');
const numsDisplay = document.getElementById('nums-display');

// Inicialización de la UI
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

// Evento para filtrar números mayores a 10
document.getElementById('btn-nums').addEventListener('click', () => {
    const filtered = filtrarMayoresA10(nums);
    resNums.innerText = `Resultado: ${JSON.stringify(filtered)}`;
    document.getElementById('btn-nums').disabled = true;
});

// 2. Palabras
const words = ["sol", "computadora", "mar", "estrella", "casa", "teclado"];
const resWords = document.getElementById('res-words');
const wordsDisplay = document.getElementById('words-display');

// Inicialización de la UI
if (wordsDisplay) wordsDisplay.innerText = `Palabras: ${JSON.stringify(words)}`;

// Evento para filtrar palabras con más de 5 caracteres
document.getElementById('btn-words').addEventListener('click', () => {
    const filtered = filtrarPalabrasLargas(words);
    resWords.innerText = `Resultado: ${JSON.stringify(filtered)}`;
    document.getElementById('btn-words').disabled = true;
});

// 3. Usuarios
const usuarios = [
    { nombre: 'Leo', activo: true },
    { nombre: 'Marta', activo: false },
    { nombre: 'Santi', activo: true },
    { nombre: 'Ana', activo: false }
];
const usersDisplay = document.getElementById('users-display');
const resUsers = document.getElementById('res-users');

// Inicialización de la UI
if (usersDisplay) usersDisplay.innerText = `Usuarios: ${JSON.stringify(usuarios)}`;

// Evento para filtrar objetos de usuario por su estado activo
document.getElementById('btn-users').addEventListener('click', () => {
    const filtered = filtrarUsuariosActivos(usuarios);
    resUsers.innerText = `Activos: ${JSON.stringify(filtered)}`;
    document.getElementById('btn-users').disabled = true;
});
