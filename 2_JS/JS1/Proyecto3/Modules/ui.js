/**
 * Módulo de Utilidades UI - Proyecto 3
 */

export const initTheme = () => {
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('p3-theme') || 'light';
    
    html.setAttribute('data-theme', saved);
    btn.textContent = saved === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';

    btn.onclick = () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('p3-theme', next);
        btn.textContent = next === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    };
};

/**
 * Muestra/Oculta el campo de hijos dinámicamente
 */
export const toggleChildrenInput = (show) => {
    const group = document.getElementById('children-count-group');
    const input = document.getElementById('childrenCount');
    if (show) {
        group.classList.remove('hidden');
        input.required = true;
    } else {
        group.classList.add('hidden');
        input.required = false;
        input.value = '';
    }
};

/**
 * Renderiza la lista de personas desde el localStorage
 */
export const renderPeople = (people) => {
    const list = document.getElementById('registry-list');
    list.innerHTML = '';
    
    if (people.length === 0) {
        list.innerHTML = '<p class="empty-msg">No hay registros guardados.</p>';
        return;
    }

    people.forEach(p => {
        const div = document.createElement('div');
        div.className = 'person-item';
        div.innerHTML = `
            <h3 class="person-name">${p.firstName.toUpperCase()} ${p.lastName.toUpperCase()}</h3>
            <div class="person-details-grid">
                <div class="detail-item">
                    <span class="detail-label">Edad:</span>
                    <span class="detail-value">${p.age} años</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Fecha Nac.:</span>
                    <span class="detail-value">${formatDate(p.dob)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Sexo:</span>
                    <span class="detail-value">${p.sex}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">DNI:</span>
                    <span class="detail-value">${p.dni}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Estado Civil:</span>
                    <span class="detail-value">${p.civilStatus}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Nacionalidad:</span>
                    <span class="detail-value">${p.nationality}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Teléfono:</span>
                    <span class="detail-value">${p.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${p.email}</span>
                </div>
                <div class="detail-item full-width">
                    <span class="detail-label">Hijos:</span>
                    <span class="detail-value">${p.hasChildren === 'yes' ? `${p.childrenCount} ${p.childrenCount === '1' ? 'hijo' : 'hijos'}` : 'No tiene'}</span>
                </div>
            </div>
        `;
        list.prepend(div);
    });
};

/**
 * Formatea una fecha para mostrarla de forma legible
 */
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
};

/**
 * Muestra alertas dinámicas (Toast)
 */
export const showAlert = (msg, type = 'success') => {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
        t.style.opacity = '0';
        setTimeout(() => t.remove(), 300);
    }, 3500);
};

export const getPersonFormData = (form) => {
    const fd = new FormData(form);
    return Object.fromEntries(fd.entries());
};