/**
 * Módulo de Utilidades UI - Proyecto 2
 */

export const initTheme = () => {
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('p2-theme') || 'light';
    
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
        return;
    }

    emptyMsg.style.display = 'none';
    
    // Determinar si mostrar tabla o lista según el ancho (opcional, manejado por CSS mejor)
    table.style.display = window.innerWidth > 768 ? 'table' : 'none';
    mobileList.style.display = window.innerWidth > 768 ? 'none' : 'grid';

    const fragmentTable = document.createDocumentFragment();
    const fragmentMobile = document.createDocumentFragment();

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
    }, 3000);
};

export const getFormData = () => {
    const form = document.getElementById('inventory-form');
    const fd = new FormData(form);
    return Object.fromEntries(fd.entries());
};