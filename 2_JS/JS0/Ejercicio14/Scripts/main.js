import { invertirLetras, invertirNumeros, revertirTexto } from '../Modules/arrayMethods.js';

// 1. Letras
const letras = ["A", "B", "C", "D", "E"];
const resLetters = document.getElementById('res-letters');
const lettersDisplay = document.getElementById('letters-display');
const btnLetters = document.getElementById('btn-letters');

// Inicialización
if (lettersDisplay) lettersDisplay.innerText = `Letras: ${JSON.stringify(letras)}`;

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

// Inicialización
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

btnNums.addEventListener('click', () => {
    const inverted = invertirNumeros(nums);
    resNums.innerText = `Resultado: ${JSON.stringify(inverted)}`;
    btnNums.disabled = true;
});

// 3. Texto
const textInput = document.getElementById('text-input');
const resText = document.getElementById('res-text');
const btnText = document.getElementById('btn-text');

btnText.addEventListener('click', () => {
    const val = textInput.value;
    if (val) {
        const result = revertirTexto(val);
        resText.innerText = result;
        btnText.disabled = true;
        textInput.disabled = true;
    }
});
