import { buscarPerro, buscarNumero50, buscarCiudad } from '../Modules/arrayMethods.js';

// 1. Perro
const animales = ["gato", "perro", "pájaro"];
const btnPerro = document.getElementById('btn-perro');
const resPerro = document.getElementById('res-perro');
const animalesDisplay = document.getElementById('animales-display');

// Inicialización de la UI
if (animalesDisplay) animalesDisplay.innerText = `Animales: ${JSON.stringify(animales)}`;

// Evento para buscar el índice de "perro"
btnPerro.addEventListener('click', () => {
    const idx = buscarPerro(animales);
    resPerro.innerText = `Índice: ${idx}`;
});

// 2. Número 50
const nums = [10, 25, 50, 75, 100];
const btn50 = document.getElementById('btn-50');
const res50 = document.getElementById('res-50');
const numsDisplay = document.getElementById('nums-display');

// Inicialización de la UI
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

// Evento para buscar el índice de un número específico (50)
btn50.addEventListener('click', () => {
    const idx = buscarNumero50(nums);
    res50.innerText = `Índice de 50: ${idx}`;
});

// 3. Ciudades
const ciudades = ["Londres", "París", "Madrid", "Roma"];
const btnCity = document.getElementById('btn-city');
const cityInput = document.getElementById('city-input');
const resCity = document.getElementById('res-city');
const citiesDisplay = document.getElementById('cities-display');

// Inicialización de la UI
if (citiesDisplay) citiesDisplay.innerText = `Ciudades: ${JSON.stringify(ciudades)}`;

// Evento para buscar una ciudad ingresada por el usuario
btnCity.addEventListener('click', () => {
    const val = cityInput.value.trim();
    if (val) {
        const msg = buscarCiudad(ciudades, val);
        resCity.innerText = msg;
        // Feedback visual (éxito/error)
        resCity.className = msg.includes('no se encuentra') ? 'mt-2 fw-bold text-danger' : 'mt-2 fw-bold text-success';
    }
});
