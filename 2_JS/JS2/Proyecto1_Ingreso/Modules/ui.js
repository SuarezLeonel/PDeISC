/**
 * Módulo de Utilidades UI
 * Maneja el cambio de tema y elementos comunes de la interfaz.
 */

export const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    return newTheme;
};

export const initTheme = (buttonId) => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.textContent = savedTheme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    }
};

export const updateButtonText = (btn, theme) => {
    btn.textContent = theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
};
