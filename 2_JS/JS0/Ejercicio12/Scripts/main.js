import { sumarTodo, multiplicarTodo, obtenerTotalPrecios } from '../Modules/arrayMethods.js';
import { initTheme, toggleTheme } from '../Modules/theme.js';

// Inicializar tema
initTheme();
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// 1. Sumar
const nums = [10, 20, 30, 40, 50];
const resSum = document.getElementById('res-sum');
const sumDisplay = document.getElementById('sum-display');
const btnSum = document.getElementById('btn-sum');

// Inicialización de la UI
if (sumDisplay) sumDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

// Evento para reducir el array a la suma total
btnSum.addEventListener('click', () => {
    const total = sumarTodo(nums);
    resSum.innerText = `Total: ${total}`;
    btnSum.disabled = true;
});

// 2. Multiplicar
const enteros = [1, 2, 3, 4, 5];
const resMul = document.getElementById('res-mul');
const mulDisplay = document.getElementById('mul-display');
const btnMul = document.getElementById('btn-mul');

// Inicialización de la UI
if (mulDisplay) mulDisplay.innerText = `Enteros: ${JSON.stringify(enteros)}`;

// Evento para reducir el array al producto total
btnMul.addEventListener('click', () => {
    const total = multiplicarTodo(enteros);
    resMul.innerText = `Producto: ${total}`;
    btnMul.disabled = true;
});

// 3. Objetos
const productos = [
    { nombre: 'PC', precio: 800 },
    { nombre: 'Mouse', precio: 25 },
    { nombre: 'Teclado', precio: 45 },
    { nombre: 'Monitor', precio: 200 }
];
const objDisplay = document.getElementById('obj-display');
const resObj = document.getElementById('res-obj');
const btnObj = document.getElementById('btn-obj');

// Inicialización de la UI
if (objDisplay) objDisplay.innerText = `Productos: ${JSON.stringify(productos)}`;

// Evento para sumar los precios de los objetos usando reduce
btnObj.addEventListener('click', () => {
    const total = obtenerTotalPrecios(productos);
    resObj.innerText = `Total Precios: $${total}`;
    btnObj.disabled = true;
});

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