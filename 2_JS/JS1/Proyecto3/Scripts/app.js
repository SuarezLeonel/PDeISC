import { initTheme, toggleChildrenInput, renderPeople, showAlert, getPersonFormData } from '../Modules/ui.js';
import { savePerson, getAllPeople } from '../Modules/storage.js';
import { validatePerson } from '../Modules/validator.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderPeople(getAllPeople());
    setupApp();
});

function setupApp() {
    const form = document.getElementById('person-form');
    
    // 1. Manejar el campo condicional "Hijos"
    form.addEventListener('change', (e) => {
        if (e.target.name === 'hasChildren') {
            toggleChildrenInput(e.target.value === 'yes');
        }
    });

    // 2. Manejar el envío del formulario
    form.onsubmit = (e) => {
        e.preventDefault();
        
        const data = getPersonFormData(form);
        const validation = validatePerson(data);

        if (validation.isValid) {
            // Guardar en LocalStorage
            savePerson(data);
            
            // UI Feedback
            showAlert("¡Registro guardado correctamente!");
            renderPeople(getAllPeople());
            
            // Reset
            form.reset();
            toggleChildrenInput(false);
        } else {
            // Mostrar primer error en un toast de error
            showAlert(validation.errors[0], 'error');
        }
    };
}