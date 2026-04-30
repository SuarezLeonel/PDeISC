import { agregarFruta, agregarAmigos, agregarSiEsMayor } from '../Modules/arrayMethods.js';

// --- Parte 1: Frutas ---
let frutas = [];
let countFrutas = 0;
const frutasDisplay = document.getElementById('frutas-display');
const btnFrutas = document.getElementById('btn-frutas');
const frutaInput = document.getElementById('fruta-input');
const frutasCountText = document.getElementById('frutas-count');

// Inicialización de la UI
frutasDisplay.innerText = `Array: ${JSON.stringify(frutas)}`;

// Evento para agregar fruta desde el input
btnFrutas.addEventListener('click', () => {
    const nombre = frutaInput.value.trim();
    if (nombre) {
        frutas = agregarFruta(frutas, nombre);
        countFrutas++;
        frutasDisplay.innerText = `Array: ${JSON.stringify(frutas)}`;
        frutasCountText.innerText = `Frutas agregadas: ${countFrutas}/3`;
        frutaInput.value = '';
        
        // Límite de 3 frutas
        if (countFrutas >= 3) {
            btnFrutas.disabled = true;
            btnFrutas.innerText = 'Límite alcanzado';
            frutaInput.disabled = true;
        }
    }
});

// --- Parte 2: Amigos ---
let amigos = ['Juan'];
let countAmigos = 0;
const amigosDisplay = document.getElementById('amigos-display');
const btnAmigos = document.getElementById('btn-amigos');
const amigoInput = document.getElementById('amigo-input');
const amigosCountText = document.getElementById('amigos-count');

// Inicialización de la UI
amigosDisplay.innerText = `Amigos: ${JSON.stringify(amigos)}`;

// Evento para agregar amigos desde el input
btnAmigos.addEventListener('click', () => {
    const nombre = amigoInput.value.trim();
    if (nombre) {
        amigos.push(nombre);
        countAmigos++;
        amigosDisplay.innerText = `Amigos: ${JSON.stringify(amigos)}`;
        amigosCountText.innerText = `Amigos agregados: ${countAmigos}/3`;
        amigoInput.value = '';
        
        // Límite de 3 amigos adicionales
        if (countAmigos >= 3) {
            btnAmigos.disabled = true;
            btnAmigos.innerText = 'Límite alcanzado';
            amigoInput.disabled = true;
        }
    }
});

// --- Parte 3: Números ---
let numeros = [10, 20, 30];
const numsDisplay = document.getElementById('nums-display');
const btnNums = document.getElementById('btn-nums');
const numInput = document.getElementById('num-input');
const msgNums = document.getElementById('msg-nums');

// Inicialización de la UI
numsDisplay.innerText = `Números: ${JSON.stringify(numeros)}`;

// Evento para agregar números bajo condición
btnNums.addEventListener('click', () => {
    const val = parseInt(numInput.value);
    if (isNaN(val)) return;

    const result = agregarSiEsMayor(numeros, val);
    numeros = result.newArr;
    numsDisplay.innerText = `Números: ${JSON.stringify(numeros)}`;

    // Feedback visual del resultado
    if (result.success) {
        msgNums.innerText = '¡Agregado con éxito!';
        msgNums.className = 'mt-2 fw-bold text-success';
    } else {
        msgNums.innerText = 'Error: El número debe ser mayor al último.';
        msgNums.className = 'mt-2 fw-bold text-danger';
    }
    numInput.value = '';
});

// --- Toggle Global ---
// Muestra u oculta las tarjetas del ejercicio
const btnToggle = document.getElementById('btn-toggle');
const cards = document.querySelectorAll('.card');
btnToggle.addEventListener('click', () => {
    cards.forEach(card => card.classList.toggle('d-none'));
});
