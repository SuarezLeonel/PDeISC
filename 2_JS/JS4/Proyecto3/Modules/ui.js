/**
 * Módulo de interfaz de usuario (UI)
 * 
 * Este módulo contiene funciones para renderizar datos y mostrar estado de carga.
 */

export function renderUsers(users, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Si no hay usuarios, mostrar mensaje
  if (users.length === 0) {
    container.innerHTML = '<div class="col-12"><div class="alert alert-info text-center">No se encontraron usuarios</div></div>';
    return;
  }

  container.innerHTML = '';

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-lg-4 mb-3';
    card.innerHTML = `
      <div class="user-item p-3 rounded-3 border h-100">
        <div class="d-flex align-items-center gap-3">
          <div class="avatar flex-shrink-0">
            <span class="fw-bold text-white">${user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div class="flex-grow-1">
            <h6 class="fw-bold mb-1">${user.name}</h6>
            <p class="mb-0 text-muted small">${user.email}</p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

export function showLoading(containerId, isLoading) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (isLoading) {
    container.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border" role="status"></div></div>';
  }
}
