import { agregarColores, agregarTareaUrgente, agregarUsuarioConectado } from '../Modules/arrayMethods.js';
import { initTheme, toggleTheme } from '../Modules/theme.js';

// Inicializar tema
initTheme();
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

const normalizarTexto = (valor) =>
    valor
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

const coloresValidos = new Set([
    'amarillo', 'azul', 'beige', 'blanco', 'bordo', 'celeste', 'coral',
    'dorado', 'fucsia', 'gris', 'lila', 'marron', 'morado', 'naranja',
    'negro', 'rojo', 'rosa', 'turquesa', 'verde', 'violeta'
]);

const esTareaValida = (valor) =>
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9][A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ,.:;()¡!¿?_-]{2,59}$/.test(valor.trim());

const esUsuarioValido = (valor) =>
    /^[A-Za-z][A-Za-z0-9_-]{2,15}$/.test(valor.trim());

const mostrarErrorInput = (input, mensaje) => {
    input.classList.add('is-invalid');
    input.setCustomValidity(mensaje);
    input.reportValidity();
};

const limpiarErrorInput = (input) => {
    input.classList.remove('is-invalid');
    input.setCustomValidity('');
};

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
    if (!val) {
        mostrarErrorInput(colorInput, 'Ingresa el nombre de un color.');
        return;
    }

    if (!coloresValidos.has(normalizarTexto(val))) {
        mostrarErrorInput(colorInput, 'Ingresa un color valido, por ejemplo: rojo, azul o verde.');
        return;
    }

    limpiarErrorInput(colorInput);
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
    if (!val) {
        mostrarErrorInput(tareaInput, 'Ingresa una tarea.');
        return;
    }

    if (!esTareaValida(val)) {
        mostrarErrorInput(tareaInput, 'La tarea debe tener al menos 3 caracteres y usar texto valido.');
        return;
    }

    limpiarErrorInput(tareaInput);
    tareas = agregarTareaUrgente(tareas, val);
    tareasDisplay.innerText = `Tareas: ${JSON.stringify(tareas)}`;
    tareaInput.value = '';
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
    if (!val) {
        mostrarErrorInput(userInput, 'Ingresa un nombre de usuario.');
        return;
    }

    if (!esUsuarioValido(val)) {
        mostrarErrorInput(userInput, 'Usa un usuario de 3 a 16 caracteres, comenzando con letra.');
        return;
    }

    limpiarErrorInput(userInput);
    usuarios = agregarUsuarioConectado(usuarios, val);
    usersDisplay.innerText = `Usuarios: ${JSON.stringify(usuarios)}`;
    userInput.value = '';
});

colorInput.addEventListener('input', () => limpiarErrorInput(colorInput));
tareaInput.addEventListener('input', () => limpiarErrorInput(tareaInput));
userInput.addEventListener('input', () => limpiarErrorInput(userInput));

// --- Tema Oscuro/Claro ---
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Tema Claro';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Tema Oscuro';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Tema Claro';
    }
});
