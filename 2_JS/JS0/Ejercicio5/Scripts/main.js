import { eliminarLetras, insertarNombre, reemplazarElementos } from '../Modules/arrayMethods.js';

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
    if (val) {
        nombres = insertarNombre(nombres, val);
        nombresDisplay.innerText = `Nombres: ${JSON.stringify(nombres)}`;
        nombreInput.value = '';
        btnNombre.disabled = true;
        btnNombre.innerText = 'Nombre insertado';
        nombreInput.disabled = true;
    }
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
    const pos = parseInt(posInput.value) || 0;
    const n1 = n1Input.value.trim();
    const n2 = n2Input.value.trim();

    if (n1 && n2) {
        elementos = reemplazarElementos(elementos, pos, n1, n2);
        reemplazoDisplay.innerText = `Elementos: ${JSON.stringify(elementos)}`;
        btnReemplazo.disabled = true;
        btnReemplazo.innerText = 'Reemplazado';
        posInput.disabled = true;
        n1Input.disabled = true;
        n2Input.disabled = true;
    }
});
