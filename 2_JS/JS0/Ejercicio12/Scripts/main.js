import { sumarTodo, multiplicarTodo, obtenerTotalPrecios } from '../Modules/arrayMethods.js';

// 1. Sumar
const nums = [10, 20, 30, 40, 50];
const resSum = document.getElementById('res-sum');
const sumDisplay = document.getElementById('sum-display');
const btnSum = document.getElementById('btn-sum');

// Inicialización
if (sumDisplay) sumDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

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

// Inicialización
if (mulDisplay) mulDisplay.innerText = `Enteros: ${JSON.stringify(enteros)}`;

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

// Inicialización
if (objDisplay) objDisplay.innerText = `Productos: ${JSON.stringify(productos)}`;

btnObj.addEventListener('click', () => {
    const total = obtenerTotalPrecios(productos);
    resObj.innerText = `Total Precios: $${total}`;
    btnObj.disabled = true;
});
