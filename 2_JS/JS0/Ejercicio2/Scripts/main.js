import { eliminarUltimoAnimal, eliminarUltimoProducto, vaciarArrayConPop } from '../Modules/arrayMethods.js';

// 1. Animales
let animales = ['Perro', 'Gato', 'Loro', 'Leon'];
const animalesDisplay = document.getElementById('animales-display');
const btnAnimales = document.getElementById('btn-animales');

// Inicialización de la UI
animalesDisplay.innerText = `Animales: ${JSON.stringify(animales)}`;

// Evento para eliminar el último animal
btnAnimales.addEventListener('click', () => {
    if (animales.length > 0) {
        animales = eliminarUltimoAnimal(animales);
        animalesDisplay.innerText = `Animales: ${JSON.stringify(animales)}`;
    }
});

// 2. Compras
let compras = ['Pan', 'Leche', 'Huevo', 'Arroz'];
const comprasDisplay = document.getElementById('compras-display');
const btnCompras = document.getElementById('btn-compras');
const msgCompras = document.getElementById('msg-compras');

// Inicialización de la UI
comprasDisplay.innerText = `Productos: ${JSON.stringify(compras)}`;

// Evento para eliminar producto y mostrar cuál fue
btnCompras.addEventListener('click', () => {
    if (compras.length > 0) {
        const result = eliminarUltimoProducto(compras);
        compras = result.newArr;
        comprasDisplay.innerText = `Productos: ${JSON.stringify(compras)}`;
        msgCompras.innerText = `Producto eliminado: ${result.eliminado}`;
        msgCompras.className = 'mt-2 fw-bold text-success';
    } else {
        msgCompras.innerText = 'La lista está vacía';
        msgCompras.className = 'mt-2 fw-bold text-danger';
    }
});

// 3. Vaciar
let datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const vaciadoDisplay = document.getElementById('vaciado-display');
const btnVaciar = document.getElementById('btn-vaciar');
const msgVaciar = document.getElementById('msg-vaciar');

// Inicialización de la UI
vaciadoDisplay.innerText = `Datos: ${JSON.stringify(datos)}`;

// Evento para vaciar todo el array y mostrar el historial
btnVaciar.addEventListener('click', () => {
    const result = vaciarArrayConPop(datos);
    datos = result.newArr;
    vaciadoDisplay.innerText = `Datos: ${JSON.stringify(datos)}`;
    msgVaciar.innerText = `Secuencia de eliminación: ${result.historial.join(' -> ')}`;
    btnVaciar.disabled = true;
});
