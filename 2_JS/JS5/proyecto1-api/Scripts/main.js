/**
 * @file main.js
 * @description Lógica del cliente para el formulario y visualización de alumnos
 * @module main
 */

/**
 * Elementos del DOM
 */
const themeToggle = document.getElementById('themeToggle');
const alumnoForm = document.getElementById('alumnoForm');
const alertSuccess = document.getElementById('alertSuccess');
const alertDanger = document.getElementById('alertDanger');
const alumnosGrid = document.getElementById('alumnosGrid');

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
 * Muestra una alerta en la interfaz y la oculta después de 5 segundos
 * @function showAlert
 * @param {HTMLElement} element - Elemento de alerta a mostrar
 * @param {string} message - Mensaje a mostrar
 */
const showAlert = (element, message) => {
  element.textContent = message;
  element.style.display = 'block';
  alertSuccess.style.display = 'none';
  alertDanger.style.display = 'none';
  element.style.display = 'block';
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
};

/**
 * Renderiza la lista de alumnos en tarjetas
 * @function renderAlumnos
 * @param {Array} alumnos - Lista de alumnos a renderizar
 */
const renderAlumnos = (alumnos) => {
  alumnosGrid.innerHTML = '';
  alumnos.forEach(alumno => {
    const card = document.createElement('div');
    card.className = 'alumno-card';
    const initial = alumno.nombre.charAt(0).toUpperCase();
    card.innerHTML = `
      <div class="alumno-avatar">${initial}</div>
      <div class="alumno-info">
        <h3>${alumno.nombre} ${alumno.apellido}</h3>
        <p><strong>ID:</strong> ${alumno.id}</p>
        <p><strong>Edad:</strong> ${alumno.edad} años</p>
      </div>
    `;
    alumnosGrid.appendChild(card);
  });
};

/**
 * Obtiene la lista de alumnos desde la API y los renderiza
 * @async
 * @function fetchAlumnos
 */
const fetchAlumnos = async () => {
  try {
    const response = await fetch('/api/alumnos');
    const data = await response.json();
    if (data.success) {
      renderAlumnos(data.data);
    }
  } catch (error) {
    console.error('Error al cargar alumnos:', error);
  }
};

/**
 * Maneja el envío del formulario para registrar un nuevo alumno
 * @async
 * @function handleSubmit
 * @param {Event} e - Evento de submit del formulario
 */
const handleSubmit = async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const edad = parseInt(document.getElementById('edad').value);

  // Validación del formulario
  if (!nombre || !apellido || !edad || edad <= 0) {
    showAlert(alertDanger, 'Por favor complete todos los campos correctamente');
    return;
  }

  try {
    const response = await fetch('/api/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellido, edad })
    });

    const data = await response.json();

    if (data.success) {
      showAlert(alertSuccess, 'Alumno registrado exitosamente!');
      alumnoForm.reset();
      fetchAlumnos();
    } else {
      showAlert(alertDanger, data.message || 'Error al registrar alumno');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert(alertDanger, 'Error de conexión con el servidor');
  }
};

/**
 * Inicialización de la aplicación
 */
initTheme();
themeToggle.addEventListener('click', toggleTheme);
alumnoForm.addEventListener('submit', handleSubmit);
fetchAlumnos();
