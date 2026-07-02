/**
 * Archivo principal de JavaScript para Proyecto 4
 * 
 * Este archivo inicializa la aplicación y maneja la lógica principal
 * para obtener alumnos desde nuestra API propia.
 */

import { initTheme, toggleTheme } from '../Modules/theme.js';
import { fetchAlumnosWithFetch, fetchAlumnosWithAxios } from '../Modules/apiService.js';
import { renderAlumnos, showLoading } from '../Modules/ui.js';

initTheme();
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

const btnFetch = document.getElementById('btn-fetch');
const btnAxios = document.getElementById('btn-axios');

/**
 * Evento click para cargar alumnos con Fetch
 */
btnFetch.addEventListener('click', async () => {
    try {
        showLoading('fetch-alumnos', true);
        const alumnos = await fetchAlumnosWithFetch();
        renderAlumnos(alumnos, 'fetch-alumnos');
    } catch (error) {
        document.getElementById('fetch-alumnos').innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los alumnos</div></div>';
    }
});

/**
 * Evento click para cargar alumnos con Axios
 */
btnAxios.addEventListener('click', async () => {
    try {
        showLoading('axios-alumnos', true);
        const alumnos = await fetchAlumnosWithAxios();
        renderAlumnos(alumnos, 'axios-alumnos');
    } catch (error) {
        document.getElementById('axios-alumnos').innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los alumnos</div></div>';
    }
});
