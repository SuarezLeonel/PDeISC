/**
 * Archivo principal de JavaScript para Proyecto 1
 * 
 * Este archivo inicializa la aplicación, configura los eventos de los botones
 * y maneja la lógica principal para obtener y mostrar usuarios.
 */

// Importar módulos necesarios
import { initTheme, toggleTheme } from '../Modules/theme.js';
import { fetchUsersWithFetch, fetchUsersWithAxios } from '../Modules/apiService.js';
import { renderUsers, showLoading } from '../Modules/ui.js';

// Inicializar el tema al cargar la página
initTheme();

// Agregar evento de click al botón de cambio de tema
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Obtener referencias a los botones por su ID
const btnFetch = document.getElementById('btn-fetch');
const btnAxios = document.getElementById('btn-axios');

// Log para depurar: verificar que los botones se hayan encontrado
console.log('Botones encontrados:', { btnFetch, btnAxios });

/**
 * Evento click para el botón de Fetch
 * Obtiene usuarios usando Fetch API y los renderiza
 */
btnFetch.addEventListener('click', async () => {
    console.log('Botón Fetch clickeado');
    try {
        // Mostrar spinner de carga
        showLoading('fetch-users', true);
        // Obtener usuarios con Fetch
        const users = await fetchUsersWithFetch();
        // Renderizar usuarios en el contenedor correspondiente
        renderUsers(users, 'fetch-users');
    } catch (error) {
        console.error('Error en Fetch:', error);
        // Mostrar mensaje de error si algo sale mal
        document.getElementById('fetch-users').innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los usuarios</div></div>';
    }
});

/**
 * Evento click para el botón de Axios
 * Obtiene usuarios usando Axios y los renderiza
 */
btnAxios.addEventListener('click', async () => {
    console.log('Botón Axios clickeado');
    try {
        // Mostrar spinner de carga
        showLoading('axios-users', true);
        // Obtener usuarios con Axios
        const users = await fetchUsersWithAxios();
        // Renderizar usuarios en el contenedor correspondiente
        renderUsers(users, 'axios-users');
    } catch (error) {
        console.error('Error en Axios:', error);
        // Mostrar mensaje de error si algo sale mal
        document.getElementById('axios-users').innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los usuarios</div></div>';
    }
});
