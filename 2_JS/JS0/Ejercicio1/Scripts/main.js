import { agregarFrutas, agregarAmigos, agregarSiEsMayor } from '../Modules/arrayMethods.js';

// --- Parte 1: Frutas ---
let frutas = [];
const frutasDisplay = document.getElementById('frutas-display');
const btnFrutas = document.getElementById('btn-frutas');

// Inicialización
frutasDisplay.innerText = `Array: ${JSON.stringify(frutas)}`;

btnFrutas.addEventListener('click', () => {
    frutas = agregarFrutas(frutas, 'Manzana', 'Pera', 'Uva');
    frutasDisplay.innerText = `Array: ${JSON.stringify(frutas)}`;
    btnFrutas.disabled = true;
    btnFrutas.innerText = 'Frutas agregadas';
});

// --- Parte 2: Amigos ---
let amigos = ['Juan'];
let countAmigos = 0;
const amigosDisplay = document.getElementById('amigos-display');
const btnAmigos = document.getElementById('btn-amigos');
const amigoInput = document.getElementById('amigo-input');
const amigosCountText = document.getElementById('amigos-count');

// Inicialización
amigosDisplay.innerText = `Amigos: ${JSON.stringify(amigos)}`;

btnAmigos.addEventListener('click', () => {
    const nombre = amigoInput.value.trim();
    if (nombre) {
        amigos.push(nombre);
        countAmigos++;
        amigosDisplay.innerText = `Amigos: ${JSON.stringify(amigos)}`;
        amigosCountText.innerText = `Amigos agregados: ${countAmigos}/3`;
        amigoInput.value = '';
        
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

// Inicialización
numsDisplay.innerText = `Números: ${JSON.stringify(numeros)}`;

btnNums.addEventListener('click', () => {
    const val = parseInt(numInput.value);
    if (isNaN(val)) return;

    const result = agregarSiEsMayor(numeros, val);
    numeros = result.newArr;
    numsDisplay.innerText = `Números: ${JSON.stringify(numeros)}`;

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
const btnToggle = document.getElementById('btn-toggle');
const cards = document.querySelectorAll('.card');
btnToggle.addEventListener('click', () => {
    cards.forEach(card => card.classList.toggle('d-none'));
});
