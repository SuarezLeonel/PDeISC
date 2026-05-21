import { readById, readByFormData, readByElements } from '../Modules/formReader.js';
import { initTheme, renderUser, showToast, validateField } from '../Modules/ui.js';

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupForm();
});

/**
 * Configuración del formulario y eventos
 */
function setupForm() {
    const form = document.getElementById('user-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Obtener valores (Demostrando los 3 métodos)
        // Usamos el primero para la lógica, pero los otros se ejecutan y loguean en consola
        const userData1 = readById();
        const userData2 = readByFormData(form);
        const userData3 = readByElements('userRegistration');

        // 2. Validaciones estrictas
        const isNameValid = validateField(
            'name', 
            userData1.name, 
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/, 
            "Nombre inválido (3-30 caracteres, solo letras)."
        );

        const isEmailValid = validateField(
            'email', 
            userData1.email, 
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
            "Correo electrónico no válido."
        );

        if (isNameValid && isEmailValid) {
            // Simular guardado y renderizar
            processNewUser(userData1);
            form.reset();
            showToast("Usuario registrado con éxito");
        } else {
            showToast("Por favor, corrija los errores", "error");
        }
    });
}

/**
 * Procesa y añade el nuevo usuario
 */
function processNewUser(user) {
    // Aquí se podría enviar al servidor vía fetch si fuera necesario
    // Por ahora lo manejamos dinámicamente en el DOM (SPA)
    renderUser(user);
}