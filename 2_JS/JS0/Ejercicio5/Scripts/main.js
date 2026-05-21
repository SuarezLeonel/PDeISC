import { eliminarLetras, insertarNombre, reemplazarElementos } from '../Modules/arrayMethods.js';

const esNombreValido = (valor) =>
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[ '\-][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(valor.trim());

const esEtiquetaValida = (valor) =>
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]{1,12}$/.test(valor.trim());

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
let letras = ['a', 'b', 'c'];
const letrasDisplay = document.getElementById('letras-display');
const btnLetras = document.getElementById('btn-letras');

// Inicialización de la UI
letrasDisplay.innerText = `Letras: ${JSON.stringify(letras)}`;

// Evento para eliminar elementos específicos con splice
btnLetras.addEventListener('click', () => {
    if (letras.length >= 3) {
        letras = eliminarLetras(letras);
        letrasDisplay.innerText = `Letras: ${JSON.stringify(letras)}`;
        btnLetras.disabled = true;
        btnLetras.innerText = 'Acción realizada';
    }
});

// 2. Nombres
let nombres = ['Ana', 'Pepe'];
const nombresDisplay = document.getElementById('nombres-display');
const btnNombre = document.getElementById('btn-nombre');
const nombreInput = document.getElementById('nombre-input');

// Inicialización de la UI
nombresDisplay.innerText = `Nombres: ${JSON.stringify(nombres)}`;

// Evento para insertar un nombre en medio del array
btnNombre.addEventListener('click', () => {
    const val = nombreInput.value.trim();
    if (!val) {
        mostrarErrorInput(nombreInput, 'Ingresa un nombre.');
        return;
    }

    if (!esNombreValido(val)) {
        mostrarErrorInput(nombreInput, 'Ingresa un nombre valido, solo letras y espacios.');
        return;
    }

    limpiarErrorInput(nombreInput);
    nombres = insertarNombre(nombres, val);
    nombresDisplay.innerText = `Nombres: ${JSON.stringify(nombres)}`;
    nombreInput.value = '';
    btnNombre.disabled = true;
    btnNombre.innerText = 'Nombre insertado';
    nombreInput.disabled = true;
});

// 3. Reemplazo
let elementos = ['X', 'Y', 'Z', 'W'];
const reemplazoDisplay = document.getElementById('reemplazo-display');
const btnReemplazo = document.getElementById('btn-reemplazo');
const posInput = document.getElementById('pos-input');
const n1Input = document.getElementById('n1-input');
const n2Input = document.getElementById('n2-input');

// Inicialización de la UI
reemplazoDisplay.innerText = `Elementos: ${JSON.stringify(elementos)}`;

// Evento para reemplazar elementos en una posición elegida
btnReemplazo.addEventListener('click', () => {
    const pos = Number(posInput.value);
    const n1 = n1Input.value.trim();
    const n2 = n2Input.value.trim();

    if (!Number.isInteger(pos) || pos < 0 || pos >= elementos.length) {
        mostrarErrorInput(posInput, `Ingresa una posicion entera entre 0 y ${elementos.length - 1}.`);
        return;
    }

    if (!n1) {
        mostrarErrorInput(n1Input, 'Ingresa el primer nuevo elemento.');
        return;
    }

    if (!esEtiquetaValida(n1)) {
        mostrarErrorInput(n1Input, 'Usa un valor corto sin espacios, por ejemplo X1 o ItemA.');
        return;
    }

    if (!n2) {
        mostrarErrorInput(n2Input, 'Ingresa el segundo nuevo elemento.');
        return;
    }

    if (!esEtiquetaValida(n2)) {
        mostrarErrorInput(n2Input, 'Usa un valor corto sin espacios, por ejemplo Y2 o ItemB.');
        return;
    }

    limpiarErrorInput(posInput);
    limpiarErrorInput(n1Input);
    limpiarErrorInput(n2Input);
    elementos = reemplazarElementos(elementos, pos, n1, n2);
    reemplazoDisplay.innerText = `Elementos: ${JSON.stringify(elementos)}`;
    btnReemplazo.disabled = true;
    btnReemplazo.innerText = 'Reemplazado';
    posInput.disabled = true;
    n1Input.disabled = true;
    n2Input.disabled = true;
});

nombreInput.addEventListener('input', () => limpiarErrorInput(nombreInput));
posInput.addEventListener('input', () => limpiarErrorInput(posInput));
n1Input.addEventListener('input', () => limpiarErrorInput(n1Input));
n2Input.addEventListener('input', () => limpiarErrorInput(n2Input));

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
