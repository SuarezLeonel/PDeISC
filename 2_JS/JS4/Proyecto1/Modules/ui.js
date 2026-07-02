/**
 * Módulo de interfaz de usuario (UI)
 * 
 * Este módulo contiene funciones para renderizar datos y mostrar estado de carga
 * en la interfaz gráfica.
 */

/**
 * Renderiza la lista de usuarios en el contenedor especificado
 * 
 * @param {Array} users - Lista de usuarios a renderizar
 * @param {string} containerId - ID del contenedor HTML donde se renderizarán los usuarios
 */
export function renderUsers(users, containerId) {
  // Obtener el contenedor por su ID
  const container = document.getElementById(containerId);
  // Si el contenedor no existe, salir
  if (!container) return;

  // Limpiar el contenedor antes de renderizar
  container.innerHTML = '';

  // Iterar sobre cada usuario y crear una tarjeta para cada uno
  users.forEach(user => {
    // Crear el elemento de columna
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-lg-4 mb-3';
    
    // Crear la estructura HTML de la tarjeta
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
    
    // Agregar la tarjeta al contenedor
    container.appendChild(card);
  });
}

/**
 * Muestra un spinner de carga en el contenedor especificado
 * 
 * @param {string} containerId - ID del contenedor HTML
 * @param {boolean} isLoading - Indica si se debe mostrar el spinner (true) o no (false)
 */
export function showLoading(containerId, isLoading) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Si isLoading es true, mostrar el spinner
  if (isLoading) {
    container.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border" role="status"></div></div>';
  }
}
