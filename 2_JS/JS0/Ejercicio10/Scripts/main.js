import { multiplicarPorTres, convertirAMayusculas, aplicarIVA } from '../Modules/arrayMethods.js';

// 1. Multiplicar
const nums = [1, 2, 3, 4, 10];
const resNums = document.getElementById('res-nums');
const numsDisplay = document.getElementById('nums-display');

// Inicialización de la UI
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

// Evento para transformar el array multiplicando cada elemento por 3 (map)
document.getElementById('btn-nums').addEventListener('click', () => {
    const mapped = multiplicarPorTres(nums);
    resNums.innerText = `Resultado: ${JSON.stringify(mapped)}`;
    document.getElementById('btn-nums').disabled = true;
});

// 2. Mayúsculas
const nombres = ["ana", "luis", "pepe", "marta"];
const resNames = document.getElementById('res-names');
const namesDisplay = document.getElementById('names-display');

// Inicialización de la UI
if (namesDisplay) namesDisplay.innerText = `Nombres: ${JSON.stringify(nombres)}`;

// Evento para transformar el array de nombres a mayúsculas
document.getElementById('btn-names').addEventListener('click', () => {
    const mapped = convertirAMayusculas(nombres);
    resNames.innerText = `Resultado: ${JSON.stringify(mapped)}`;
    document.getElementById('btn-names').disabled = true;
});

// 3. IVA
const precios = [100, 250, 500, 1200, 1452];
const resPrices = document.getElementById('res-prices');
const pricesDisplay = document.getElementById('prices-display');

// Inicialización de la UI
if (pricesDisplay) pricesDisplay.innerText = `Precios: ${JSON.stringify(precios)}`;

// Evento para calcular el IVA de cada precio usando map
document.getElementById('btn-prices').addEventListener('click', () => {
    const mapped = aplicarIVA(precios);
    resPrices.innerText = `Precios con IVA: ${JSON.stringify(mapped)}`;
    document.getElementById('btn-prices').disabled = true;
});
