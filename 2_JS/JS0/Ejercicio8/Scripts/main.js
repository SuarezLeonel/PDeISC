import { esAdmin, existeVerde, agregarSiNoExiste } from '../Modules/arrayMethods.js';

// 1. Admin
const roles = ["user", "editor", "guest"]; // No tiene admin inicialmente
const resAdmin = document.getElementById('res-admin');
const rolesDisplay = document.getElementById('roles-display');

// Inicialización de la UI
if (rolesDisplay) rolesDisplay.innerText = `Roles: ${JSON.stringify(roles)}`;

// Evento para verificar si existe el rol admin usando includes
document.getElementById('btn-admin').addEventListener('click', () => {
    const check = esAdmin(roles);
    resAdmin.innerText = check ? '¡Sí! Hay un administrador.' : 'No hay administradores.';
    resAdmin.className = check ? 'mt-2 fw-bold text-success' : 'mt-2 fw-bold text-danger';
    document.getElementById('btn-admin').disabled = true;
});

// 2. Verde
const colores = ["rojo", "azul", "amarillo"]; // No tiene verde inicialmente
const resVerde = document.getElementById('res-verde');
const coloresDisplay = document.getElementById('colores-display');

// Inicialización de la UI
if (coloresDisplay) coloresDisplay.innerText = `Colores: ${JSON.stringify(colores)}`;

// Evento para verificar la existencia del color verde
document.getElementById('btn-verde').addEventListener('click', () => {
    const check = existeVerde(colores);
    resVerde.innerText = check ? 'El verde existe.' : 'El verde no está.';
    resVerde.className = check ? 'mt-2 fw-bold text-success' : 'mt-2 fw-bold text-danger';
    document.getElementById('btn-verde').disabled = true;
});

// 3. Agregar
let numeros = [1, 2, 3];
const numsDisplay = document.getElementById('nums-display');
const numInput = document.getElementById('num-input');
const resSumar = document.getElementById('res-sumar');

// Inicialización de la UI
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(numeros)}`;

// Evento para agregar un número solo si no está en el array (evitar duplicados)
document.getElementById('btn-sumar').addEventListener('click', () => {
    const val = parseInt(numInput.value);
    if (isNaN(val)) return;

    const result = agregarSiNoExiste(numeros, val);
    numeros = result.newArr;
    numsDisplay.innerText = `Números: ${JSON.stringify(numeros)}`;

    // Feedback del resultado de la operación
    if (result.success) {
        resSumar.innerText = `¡Sumado! El número ${val} no estaba.`;
        resSumar.className = 'mt-2 fw-bold text-success';
    } else {
        resSumar.innerText = `Error: El número ${val} ya existe.`;
        resSumar.className = 'mt-2 fw-bold text-danger';
    }
    numInput.value = '';
});
