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