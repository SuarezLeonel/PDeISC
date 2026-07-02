/**
 * Archivo principal de JavaScript para Proyecto 2
 * 
 * Este archivo inicializa la aplicación, configura los eventos del formulario
 * y maneja la lógica principal para enviar datos a la API.
 */

// Importar módulos necesarios
import { initTheme, toggleTheme } from '../Modules/theme.js';
import { validateName, validateEmail } from '../Modules/validator.js';
import { postUserWithFetch, postUserWithAxios } from '../Modules/apiService.js';

// Inicializar el tema al cargar la página
initTheme();

// Agregar evento de click al botón de cambio de tema
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Obtener referencias a los elementos del DOM
const btnFetch = document.getElementById('btn-fetch');
const btnAxios = document.getElementById('btn-axios');
const resultDiv = document.getElementById('result');

/**
 * Maneja el envío del formulario usando Fetch
 */
btnFetch.addEventListener('click', async () => {
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Validar datos
    if (!validateName(name)) {
        alert('Nombre inválido: mínimo 2 caracteres y solo letras');
        return;
    }
    if (!validateEmail(email)) {
        alert('Email inválido');
        return;
    }

    try {
        // Mostrar estado de envío
        resultDiv.innerHTML = '<div class="spinner-border" role="status"></div> Enviando...';
        // Enviar datos con Fetch
        const response = await postUserWithFetch({ name, email });
        // Mostrar resultado
        resultDiv.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">✅ Éxito!</h4>
                <p>Usuario creado con éxito usando Fetch.</p>
                <hr>
                <p class="mb-0"><strong>ID de respuesta:</strong> ${response.id}</p>
            </div>
        `;
    } catch (error) {
        // Mostrar error
        resultDiv.innerHTML = '<div class="alert alert-danger">Error al enviar los datos</div>';
    }
});

/**
 * Maneja el envío del formulario usando Axios
 */
btnAxios.addEventListener('click', async () => {
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Validar datos
    if (!validateName(name)) {
        alert('Nombre inválido: mínimo 2 caracteres y solo letras');
        return;
    }
    if (!validateEmail(email)) {
        alert('Email inválido');
        return;
    }

    try {
        // Mostrar estado de envío
        resultDiv.innerHTML = '<div class="spinner-border" role="status"></div> Enviando...';
        // Enviar datos con Axios
        const response = await postUserWithAxios({ name, email });
        // Mostrar resultado
        resultDiv.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">✅ Éxito!</h4>
                <p>Usuario creado con éxito usando Axios.</p>
                <hr>
                <p class="mb-0"><strong>ID de respuesta:</strong> ${response.id}</p>
            </div>
        `;
    } catch (error) {
        // Mostrar error
        resultDiv.innerHTML = '<div class="alert alert-danger">Error al enviar los datos</div>';
    }
});
