import { buscarPerro, buscarNumero50, buscarCiudad } from '../Modules/arrayMethods.js';

const esCiudadValida = (valor) =>
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[ '\-][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(valor.trim());

const mostrarErrorInput = (input, mensaje) => {
    input.classList.add('is-invalid');
    input.setCustomValidity(mensaje);
    input.reportValidity();
};

const limpiarErrorInput = (input) => {
    input.classList.remove('is-invalid');
    input.setCustomValidity('');
};

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
    resPerro.className = 'mt-2 fw-bold result-success';
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
    res50.className = 'mt-2 fw-bold result-success';
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
    if (!val) {
        mostrarErrorInput(cityInput, 'Ingresa el nombre de una ciudad.');
        return;
    }

    if (!esCiudadValida(val)) {
        mostrarErrorInput(cityInput, 'Ingresa una ciudad valida, solo letras y espacios.');
        return;
    }

    limpiarErrorInput(cityInput);
    const msg = buscarCiudad(ciudades, val);
    resCity.innerText = msg;
    // Feedback visual (éxito/error)
    resCity.className = msg.includes('no se encuentra') ? 'mt-2 fw-bold result-error' : 'mt-2 fw-bold result-success';
});

cityInput.addEventListener('input', () => limpiarErrorInput(cityInput));

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
