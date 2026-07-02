/**
 * @file main.js
 * @description Lógica principal del cliente para visualizar alumnos
 * @module main
 */

import { fetchAlumnos } from '../Modules/apiService.js';

/**
 * Elementos del DOM
 */
const themeToggle = document.getElementById('themeToggle');
const refreshBtn = document.getElementById('refreshBtn');
const alumnosTableBody = document.getElementById('alumnosTableBody');
const totalAlumnos = document.getElementById('totalAlumnos');

/**
 * Inicializa el tema cargando la preferencia guardada en localStorage
 * @function initTheme
 */
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Modo Claro';
  }
};

/**
 * Alterna entre el tema claro y oscuro y guarda la preferencia
 * @function toggleTheme
 */
const toggleTheme = () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
};

/**
 * Renderiza la lista de alumnos en la tabla
 * @function renderAlumnos
 * @param {Array} alumnos - Lista de alumnos a renderizar
 */
const renderAlumnos = (alumnos) => {
  totalAlumnos.textContent = alumnos.length;

  if (alumnos.length === 0) {
    alumnosTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="loading">No hay alumnos registrados</td>
      </tr>
    `;
    return;
  }

  alumnosTableBody.innerHTML = alumnos.map(alumno => {
    const initial = alumno.nombre.charAt(0).toUpperCase();
    return `
      <tr>
        <td>
          <span class="alumno-avatar">${initial}</span>
          <span class="alumno-nombre">${alumno.nombre} ${alumno.apellido}</span>
        </td>
        <td><strong>${alumno.id}</strong></td>
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.edad} años</td>
      </tr>
    `;
  }).join('');
};

/**
 * Muestra un mensaje de error en la tabla
 * @function showError
 * @param {string} message - Mensaje de error a mostrar
 */
const showError = (message) => {
  alumnosTableBody.innerHTML = `
    <tr>
      <td colspan="5">
        <div class="error-message">
          <strong>⚠️ Error:</strong> ${message}
        </div>
      </td>
    </tr>
  `;
};

/**
 * Carga los alumnos desde la API y los renderiza
 * @async
 * @function loadAlumnos
 */
const loadAlumnos = async () => {
  alumnosTableBody.innerHTML = `
    <tr>
      <td colspan="5" class="loading">Cargando datos...</td>
    </tr>
  `;

  try {
    const data = await fetchAlumnos();
    if (data.success) {
      renderAlumnos(data.data);
    } else {
      showError(data.message || 'Error al cargar los datos');
    }
  } catch (error) {
    console.error('Error al cargar alumnos:', error);
    showError('No se pudo conectar con el servidor API. Asegúrese de que el Proyecto 1 esté corriendo en http://localhost:4000');
  }
};

/**
 * Inicialización de la aplicación
 */
initTheme();
themeToggle.addEventListener('click', toggleTheme);
refreshBtn.addEventListener('click', loadAlumnos);
loadAlumnos();
