/**
 * Archivo principal de JavaScript para Proyecto 3
 * 
 * Este archivo inicializa la aplicación, configura los eventos de búsqueda
 * y maneja la lógica principal para obtener y filtrar usuarios.
 */

import { initTheme, toggleTheme } from '../Modules/theme.js';
import { fetchAllUsersWithFetch, fetchAllUsersWithAxios, filterUsers } from '../Modules/apiService.js';
import { renderUsers, showLoading } from '../Modules/ui.js';

initTheme();
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Variables globales para almacenar los usuarios
let fetchUsersData = [];
let axiosUsersData = [];

// Obtener referencias a los elementos del DOM
const btnFetchLoad = document.getElementById('btn-fetch-load');
const btnAxiosLoad = document.getElementById('btn-axios-load');
const fetchSearch = document.getElementById('fetch-search');
const axiosSearch = document.getElementById('axios-search');

/**
 * Evento click para cargar usuarios con Fetch
 */
btnFetchLoad.addEventListener('click', async () => {
    try {
        showLoading('fetch-users', true);
        fetchUsersData = await fetchAllUsersWithFetch();
        renderUsers(fetchUsersData, 'fetch-users');
    } catch (error) {
        document.getElementById('fetch-users').innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los usuarios</div></div>';
    }
});

/**
 * Evento click para cargar usuarios con Axios
 */
btnAxiosLoad.addEventListener('click', async () => {
    try {
        showLoading('axios-users', true);
        axiosUsersData = await fetchAllUsersWithAxios();
        renderUsers(axiosUsersData, 'axios-users');
    } catch (error) {
        document.getElementById('axios-users').innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los usuarios</div></div>';
    }
});

/**
 * Evento input para filtrar usuarios (Fetch)
 */
fetchSearch.addEventListener('input', (e) => {
    const filtered = filterUsers(fetchUsersData, e.target.value);
    renderUsers(filtered, 'fetch-users');
});

/**
 * Evento input para filtrar usuarios (Axios)
 */
axiosSearch.addEventListener('input', (e) => {
    const filtered = filterUsers(axiosUsersData, e.target.value);
    renderUsers(filtered, 'axios-users');
});
