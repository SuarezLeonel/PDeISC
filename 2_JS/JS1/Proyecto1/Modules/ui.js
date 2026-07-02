/**
 * Módulo de Utilidades de Interfaz de Usuario
 */

/**
 * Gestiona el cambio de tema (Oscuro/Claro)
 */
export const initTheme = () => {
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('p1-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeBtn.textContent = savedTheme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('p1-theme', newTheme);
        themeBtn.textContent = newTheme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    });
};

/**
 * Renderiza un usuario en la lista del DOM
 */
export const renderUser = (user) => {
    const userList = document.getElementById('user-list');
    const emptyMsg = userList.querySelector('.empty-msg');
    
    if (emptyMsg) emptyMsg.remove();

    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <span class="role-badge role-${user.role}">${user.role}</span>
    `;
    
    userList.prepend(card);
};

/**
 * Muestra un mensaje Toast dinámico
 */
export const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

/**
 * Validación estricta de campos
 */
export const validateField = (id, value, regex, errorMsg) => {
    const errorSpan = document.getElementById(`error-${id}`);
    if (!regex.test(value)) {
        errorSpan.textContent = errorMsg;
        return false;
    }
    errorSpan.textContent = '';
    return true;
};