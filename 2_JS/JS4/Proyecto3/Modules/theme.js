/**
 * Módulo de gestión de tema oscuro/claro
 * 
 * Este módulo maneja la funcionalidad para cambiar entre tema claro y oscuro,
 * guardando la preferencia del usuario en localStorage.
 */

/**
 * Inicializa el tema al cargar la página
 * Lee la preferencia guardada en localStorage y aplica el tema correspondiente
 */
export function initTheme() {
  const savedTheme = localStorage.getItem('js4-proyecto3-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateButtonText();
}

/**
 * Alterna entre tema claro y oscuro
 * Guarda la nueva preferencia en localStorage
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('js4-proyecto3-theme', next);
  updateButtonText();
}

/**
 * Actualiza el texto del botón de cambio de tema
 */
function updateButtonText() {
  const btn = document.getElementById('theme-toggle');
  const current = document.documentElement.getAttribute('data-theme');
  if (btn) {
    btn.textContent = current === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
  }
}
