import { agregarColores, agregarTareaUrgente, agregarUsuarioConectado } from '../Modules/arrayMethods.js';

// 1. Colores
let colores = [];
let countColores = 0;
const coloresDisplay = document.getElementById('colores-display');
const btnColores = document.getElementById('btn-colores');
const colorInput = document.getElementById('color-input');
const coloresCountText = document.getElementById('colores-count');

// Inicialización de la UI
coloresDisplay.innerText = `Colores: ${JSON.stringify(colores)}`;

// Evento para agregar colores al inicio (unshift)
btnColores.addEventListener('click', () => {
    const val = colorInput.value.trim();
    if (val) {
        colores.unshift(val);
        countColores++;
        coloresDisplay.innerText = `Colores: ${JSON.stringify(colores)}`;
        coloresCountText.innerText = `Colores agregados: ${countColores}/3`;
        colorInput.value = '';
        
        // Límite de 3 colores
        if (countColores >= 3) {
            btnColores.disabled = true;
            btnColores.innerText = 'Límite alcanzado';
            colorInput.disabled = true;
        }
    }
});

// 2. Tareas
let tareas = ['Estudiar', 'Cocinar'];
const tareasDisplay = document.getElementById('tareas-display');
const btnTarea = document.getElementById('btn-tarea');
const tareaInput = document.getElementById('tarea-input');

// Inicialización de la UI
tareasDisplay.innerText = `Tareas: ${JSON.stringify(tareas)}`;

// Evento para agregar tarea urgente al inicio
btnTarea.addEventListener('click', () => {
    const val = tareaInput.value.trim();
    if (val) {
        tareas = agregarTareaUrgente(tareas, val);
        tareasDisplay.innerText = `Tareas: ${JSON.stringify(tareas)}`;
        tareaInput.value = '';
    }
});

// 3. Usuarios
let usuarios = ['Admin', 'Guest'];
const usersDisplay = document.getElementById('users-display');
const btnUser = document.getElementById('btn-user');
const userInput = document.getElementById('user-input');

// Inicialización de la UI
usersDisplay.innerText = `Usuarios: ${JSON.stringify(usuarios)}`;

// Evento para agregar usuario conectado al inicio
btnUser.addEventListener('click', () => {
    const val = userInput.value.trim();
    if (val) {
        usuarios = agregarUsuarioConectado(usuarios, val);
        usersDisplay.innerText = `Usuarios: ${JSON.stringify(usuarios)}`;
        userInput.value = '';
    }
});
