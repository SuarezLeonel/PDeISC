/**
<<<<<<< HEAD
 * Módulo de Utilidades UI - Proyecto 2
 */

=======
 * Módulo UI — Catálogo de artículos deportivos
 */

const METODO_LABELS = {
    push: 'push()',
    unshift: 'unshift()',
    spread: 'spread [...]',
    concat: 'concat()'
};

>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
export const initTheme = () => {
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('p2-theme') || 'light';
<<<<<<< HEAD
    
=======

>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
    html.setAttribute('data-theme', saved);
    btn.textContent = saved === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';

    btn.onclick = () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('p2-theme', next);
        btn.textContent = next === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    };
};

<<<<<<< HEAD
export const renderTable = (items, onDelete) => {
    const body = document.getElementById('inventory-body');
    const mobileList = document.getElementById('mobile-list');
    const emptyMsg = document.getElementById('empty-msg');
    const table = document.getElementById('inventory-table');
    
    body.innerHTML = '';
    mobileList.innerHTML = '';
    
    if (items.length === 0) {
        emptyMsg.style.display = 'block';
        table.style.display = 'none';
=======
const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(precio));

const badgeCondicion = (condicion) => {
    const cls = condicion.toLowerCase();
    return `<span class="badge-condicion badge-condicion--${cls}">${condicion}</span>`;
};

const badgeDeporte = (deporte) =>
    `<span class="badge-deporte">${deporte}</span>`;

const badgeMetodo = (metodo) =>
    `<span class="badge-metodo badge-metodo--${metodo}">${METODO_LABELS[metodo] || metodo}</span>`;

export const renderCatalogo = (items, onDelete) => {
    const body = document.getElementById('catalog-body');
    const mobileList = document.getElementById('mobile-list');
    const emptyMsg = document.getElementById('empty-msg');
    const table = document.getElementById('catalog-table');
    const countEl = document.getElementById('array-count');

    body.innerHTML = '';
    mobileList.innerHTML = '';
    countEl.textContent = String(items.length);

    if (items.length === 0) {
        emptyMsg.style.display = 'block';
        table.style.display = 'none';
        mobileList.style.display = 'none';
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
        return;
    }

    emptyMsg.style.display = 'none';
<<<<<<< HEAD
    
    // Determinar si mostrar tabla o lista según el ancho (opcional, manejado por CSS mejor)
    table.style.display = window.innerWidth > 768 ? 'table' : 'none';
    mobileList.style.display = window.innerWidth > 768 ? 'none' : 'grid';
=======
    const esDesktop = window.innerWidth > 768;
    table.style.display = esDesktop ? 'table' : 'none';
    mobileList.style.display = esDesktop ? 'none' : 'grid';
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405

    const fragmentTable = document.createDocumentFragment();
    const fragmentMobile = document.createDocumentFragment();

<<<<<<< HEAD
    items.forEach(item => {
        // 1. Renderizar Fila de Tabla
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.productName}</strong></td>
            <td>${item.category}</td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
            <td>${item.stock}</td>
            <td><code>${item.sku}</code></td>
            <td>${item.supplier}</td>
            <td>${item.entryDate}</td>
            <td><span class="badge-${item.priority.toLowerCase()}">${item.priority}</span></td>
            <td>
                <button class="btn-delete" data-id="${item.id}">🗑️</button>
            </td>
        `;
        
        row.querySelector('.btn-delete').onclick = () => onDelete(item.id);
        fragmentTable.appendChild(row);

        // 2. Renderizar Tarjeta Móvil
        const card = document.createElement('div');
        card.className = 'mobile-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${item.productName}</h3>
                <span class="badge-${item.priority.toLowerCase()}">${item.priority}</span>
            </div>
            <div class="card-body">
                <p><strong>SKU:</strong> ${item.sku}</p>
                <p><strong>Stock:</strong> ${item.stock}</p>
                <p><strong>Precio:</strong> $${item.price}</p>
            </div>
            <div class="card-footer">
                <button class="btn-delete-full" data-id="${item.id}">Eliminar Producto</button>
=======
    items.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.nombre}</strong></td>
            <td>${badgeDeporte(item.deporte)}</td>
            <td>${item.marca}</td>
            <td>${formatearPrecio(item.precio)}</td>
            <td>${item.talla}</td>
            <td>${item.material}</td>
            <td>${item.stock}</td>
            <td>${badgeCondicion(item.condicion)}</td>
            <td>${item.fechaIngreso}</td>
            <td><code>${item.codigo}</code></td>
            <td>${badgeMetodo(item.metodo)}</td>
            <td><button type="button" class="btn-delete" data-id="${item.id}" title="Eliminar">🗑️</button></td>
        `;
        row.querySelector('.btn-delete').onclick = () => onDelete(item.id);
        fragmentTable.appendChild(row);

        const card = document.createElement('article');
        card.className = 'mobile-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${item.nombre}</h3>
                ${badgeDeporte(item.deporte)}
            </div>
            <div class="card-body">
                <p><strong>Marca:</strong> ${item.marca}</p>
                <p><strong>Precio:</strong> ${formatearPrecio(item.precio)}</p>
                <p><strong>Talla:</strong> ${item.talla} · <strong>Material:</strong> ${item.material}</p>
                <p><strong>Stock:</strong> ${item.stock} u. · ${badgeCondicion(item.condicion)}</p>
                <p><strong>Código:</strong> <code>${item.codigo}</code></p>
                <p><strong>Ingreso:</strong> ${item.fechaIngreso}</p>
                <p><strong>Guardado con:</strong> ${badgeMetodo(item.metodo)}</p>
            </div>
            <div class="card-footer">
                <button type="button" class="btn-delete-full" data-id="${item.id}">Eliminar artículo</button>
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
            </div>
        `;
        card.querySelector('.btn-delete-full').onclick = () => onDelete(item.id);
        fragmentMobile.appendChild(card);
    });

    body.appendChild(fragmentTable);
    mobileList.appendChild(fragmentMobile);
};

export const showToast = (msg, type = 'success') => {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
        t.style.opacity = '0';
        setTimeout(() => t.remove(), 300);
<<<<<<< HEAD
    }, 3000);
};

export const getFormData = () => {
    const form = document.getElementById('inventory-form');
    const fd = new FormData(form);
    return Object.fromEntries(fd.entries());
};
=======
    }, 3200);
};

export const getFormData = () => {
    const form = document.getElementById('sports-form');
    const fd = new FormData(form);
    return Object.fromEntries(fd.entries());
};
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
