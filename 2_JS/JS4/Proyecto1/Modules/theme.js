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
  // Obtener tema guardado o usar 'light' por defecto
  const savedTheme = localStorage.getItem('js4-proyecto1-theme') || 'light';
  // Aplicar tema al documento
  document.documentElement.setAttribute('data-theme', savedTheme);
  // Actualizar texto del botón según tema
  updateButtonText();
}

/**
 * Alterna entre tema claro y oscuro
 * Guarda la nueva preferencia en localStorage
 */
export function toggleTheme() {
  // Obtener tema actual
  const current = document.documentElement.getAttribute('data-theme');
  // Cambiar al tema opuesto
  const next = current === 'light' ? 'dark' : 'light';
  // Aplicar nuevo tema
  document.documentElement.setAttribute('data-theme', next);
  // Guardar preferencia
  localStorage.setItem('js4-proyecto1-theme', next);
  // Actualizar texto del botón
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
