/**
 * Módulo de tema oscuro/claro reutilizable
 */
export function initTheme() {
  const savedTheme = localStorage.getItem('js0-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateButtonText();
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('js0-theme', next);
  updateButtonText();
}

function updateButtonText() {
  const btn = document.getElementById('theme-toggle');
  const current = document.documentElement.getAttribute('data-theme');
  if (btn) {
    btn.textContent = current === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
  }
}
