<<<<<<< HEAD
import { addToEnd, addToStart, addWithSpread, getInventory, deleteById, filterInventory } from '../Modules/storage.js';
import { initTheme, renderTable, showToast, getFormData } from '../Modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEvents();
});

function setupEvents() {
    const form = document.getElementById('inventory-form');
    const pushBtn = document.getElementById('add-btn');
    const unshiftBtn = document.getElementById('unshift-btn');
    const spreadBtn = document.getElementById('spread-btn');
    const searchInput = document.getElementById('search-input');

    // Función auxiliar para renderizar con el callback de borrado
    const updateUI = (items = getInventory()) => {
        renderTable(items, (id) => {
            const updated = deleteById(id);
            updateUI(updated);
            showToast("Producto eliminado");
        });
    };

    // Manejar el submit (Push por defecto)
    form.onsubmit = (e) => {
        e.preventDefault();
        const data = getFormData();
        if (validate(data)) {
            const updated = addToEnd(data);
            updateUI(updated);
            form.reset();
            showToast("Producto añadido al final (push)");
        }
    };

    // Unshift
    unshiftBtn.onclick = () => {
        const data = getFormData();
        if (validate(data)) {
            const updated = addToStart(data);
            updateUI(updated);
            form.reset();
            showToast("Producto añadido al inicio (unshift)");
        }
    };

    // Spread
    spreadBtn.onclick = () => {
        const data = getFormData();
        if (validate(data)) {
            const updated = addWithSpread(data);
            updateUI(updated);
            form.reset();
            showToast("Copia creada con Spread Operator [...]");
        }
    };

    // Búsqueda
    searchInput.oninput = (e) => {
        const filtered = filterInventory(e.target.value);
        updateUI(filtered);
    };

    // Re-renderizar al cambiar el tamaño de ventana para switch entre tabla/tarjetas
    window.onresize = () => updateUI();
}

function validate(data) {
    if (!data.productName || data.productName.length < 3) {
        showToast("El nombre del producto es demasiado corto", "error");
        return false;
    }
    if (!data.price || data.price <= 0) {
        showToast("El precio debe ser mayor a 0", "error");
        return false;
    }
    if (!data.sku.match(/^[A-Z]{3}-\d{5}$/)) {
        showToast("SKU inválido. Formato: AAA-12345", "error");
        return false;
    }
    return true;
}
=======
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
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
