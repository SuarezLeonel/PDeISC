import { invertirLetras, invertirNumeros, revertirTexto } from '../Modules/arrayMethods.js';
import { initTheme, toggleTheme } from '../Modules/theme.js';

// Inicializar tema
initTheme();
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

const esTextoValido = (valor) =>
    /[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]/.test(valor) && valor.trim().length >= 2;

const mostrarErrorInput = (input, mensaje) => {
    input.classList.add('is-invalid');
    input.setCustomValidity(mensaje);
    input.reportValidity();
};

const limpiarErrorInput = (input) => {
    input.classList.remove('is-invalid');
    input.setCustomValidity('');
};

// 1. Letras
const letras = ["A", "B", "C", "D", "E"];
const resLetters = document.getElementById('res-letters');
const lettersDisplay = document.getElementById('letters-display');
const btnLetters = document.getElementById('btn-letters');

// Inicialización de la UI
if (lettersDisplay) lettersDisplay.innerText = `Letras: ${JSON.stringify(letras)}`;

// Evento para invertir el orden del array de letras (reverse)
btnLetters.addEventListener('click', () => {
    const inverted = invertirLetras(letras);
    resLetters.innerText = `Resultado: ${JSON.stringify(inverted)}`;
    btnLetters.disabled = true;
});

// 2. Números
const nums = [1, 2, 3, 4, 5, 6, 7];
const resNums = document.getElementById('res-nums');
const numsDisplay = document.getElementById('nums-display');
const btnNums = document.getElementById('btn-nums');

// Inicialización de la UI
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

// Evento para invertir el orden del array de números
btnNums.addEventListener('click', () => {
    const inverted = invertirNumeros(nums);
    resNums.innerText = `Resultado: ${JSON.stringify(inverted)}`;
    btnNums.disabled = true;
});

// 3. Texto
const textInput = document.getElementById('text-input');
const resText = document.getElementById('res-text');
const btnText = document.getElementById('btn-text');

// Evento para revertir un string ingresado por el usuario
btnText.addEventListener('click', () => {
    const val = textInput.value;
    if (!val.trim()) {
        mostrarErrorInput(textInput, 'Ingresa un texto para invertir.');
        return;
    }

    if (!esTextoValido(val)) {
        mostrarErrorInput(textInput, 'Ingresa un texto valido de al menos 2 caracteres.');
        return;
    }

    limpiarErrorInput(textInput);
    const result = revertirTexto(val);
    resText.innerText = result;
    btnText.disabled = true;
    textInput.disabled = true;
});

textInput.addEventListener('input', () => limpiarErrorInput(textInput));

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
