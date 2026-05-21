import {
    agregarConPush,
    agregarConUnshift,
    agregarConSpread,
    agregarConConcat,
    obtenerCatalogo,
    eliminarPorId,
    filtrarCatalogo
} from '../Modules/storage.js';
import { initTheme, renderCatalogo, showToast, getFormData } from '../Modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('fechaIngreso').valueAsDate = new Date();
    setupEvents();
    actualizarVista();
});

function setupEvents() {
    const form = document.getElementById('sports-form');
    const pushBtn = document.getElementById('push-btn');
    const unshiftBtn = document.getElementById('unshift-btn');
    const spreadBtn = document.getElementById('spread-btn');
    const concatBtn = document.getElementById('concat-btn');
    const searchInput = document.getElementById('search-input');

    const guardarYMostrar = (fn, mensaje) => {
        const datos = getFormData();
        if (!validar(datos)) return;

        fn(datos);
        form.reset();
        document.getElementById('fechaIngreso').valueAsDate = new Date();
        searchInput.value = '';
        actualizarVista();
        showToast(mensaje);
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        guardarYMostrar(agregarConPush, 'Artículo agregado al final del array con push()');
    };

    unshiftBtn.onclick = () =>
        guardarYMostrar(agregarConUnshift, 'Artículo agregado al inicio del array con unshift()');

    spreadBtn.onclick = () =>
        guardarYMostrar(agregarConSpread, 'Artículo agregado con el operador spread [...]');

    concatBtn.onclick = () =>
        guardarYMostrar(agregarConConcat, 'Artículo agregado al array con concat()');

    searchInput.oninput = (e) => {
        const filtrados = filtrarCatalogo(e.target.value);
        renderCatalogo(filtrados, onEliminar);
    };

    window.onresize = () => actualizarVista();
}

function actualizarVista() {
    renderCatalogo(obtenerCatalogo(), onEliminar);
}

function onEliminar(id) {
    eliminarPorId(id);
    actualizarVista();
    showToast('Artículo eliminado del array');
}

function validar(data) {
    if (!data.nombre || data.nombre.trim().length < 3) {
        showToast('El nombre debe tener al menos 3 caracteres', 'error');
        return false;
    }
    if (!data.precio || Number(data.precio) <= 0) {
        showToast('El precio debe ser mayor a 0', 'error');
        return false;
    }
    if (!data.stock || Number(data.stock) < 0) {
        showToast('El stock no puede ser negativo', 'error');
        return false;
    }
    if (!/^DEP-\d{5}$/i.test(data.codigo.trim())) {
        showToast('Código inválido. Formato: DEP-00001', 'error');
        return false;
    }
    data.codigo = data.codigo.trim().toUpperCase();
    return true;
}
