import { saludarNombres, duplicarNumeros, mostrarUsuarios } from '../Modules/arrayMethods.js';

// 1. Nombres
const nombres = ["Ana", "Luis", "Pepe"];
const resNames = document.getElementById('res-names');
const namesDisplay = document.getElementById('names-display');

// Inicialización de la UI
if (namesDisplay) namesDisplay.innerText = `Nombres: ${JSON.stringify(nombres)}`;

// Evento para iterar nombres y mostrar saludos (forEach)
document.getElementById('btn-names').addEventListener('click', () => {
    resNames.innerHTML = '';
    saludarNombres(nombres, (saludo) => {
        resNames.innerHTML += `<p class="mb-1">${saludo}</p>`;
    });
});

// 2. Números
const nums = [1, 5, 10, 20];
const resNums = document.getElementById('res-nums');
const numsDisplay = document.getElementById('nums-display');

// Inicialización de la UI
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

// Evento para iterar números y mostrar sus dobles
document.getElementById('btn-nums').addEventListener('click', () => {
    resNums.innerHTML = '';
    duplicarNumeros(nums, (doble) => {
        resNums.innerHTML += `<span class="badge bg-success me-2">${doble}</span>`;
    });
});

// 3. Usuarios
const usuarios = [
    { nombre: 'Leo', edad: 25 },
    { nombre: 'Marta', edad: 32 },
    { nombre: 'Santi', edad: 19 }
];
const usersDisplay = document.getElementById('users-display');
const resUsers = document.getElementById('res-users');

// Inicialización de la UI
if (usersDisplay) usersDisplay.innerText = `Usuarios: ${JSON.stringify(usuarios)}`;

// Evento para iterar objetos y mostrar sus propiedades
document.getElementById('btn-users').addEventListener('click', () => {
    resUsers.innerHTML = '';
    mostrarUsuarios(usuarios, (detalle) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = detalle;
        resUsers.appendChild(li);
    });
});
