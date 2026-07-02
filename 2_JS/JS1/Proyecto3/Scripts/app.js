<<<<<<< HEAD
import { initTheme, toggleChildrenInput, renderPeople, showAlert, getPersonFormData } from '../Modules/ui.js';
import { savePerson, getAllPeople } from '../Modules/storage.js';
import { validatePerson } from '../Modules/validator.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
=======
import {
    initTheme,
    toggleChildrenInput,
    renderPeople,
    showAlert,
    getPersonFormData,
    populateNationalitySelect,
    showFieldErrors,
    clearFieldErrors
} from '../Modules/ui.js';
import { savePerson, getAllPeople } from '../Modules/storage.js';
import { validatePerson, calcAgeFromDob, withCalculatedAge } from '../Modules/validator.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    populateNationalitySelect();
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
    renderPeople(getAllPeople());
    setupApp();
});

function setupApp() {
    const form = document.getElementById('person-form');
<<<<<<< HEAD
    
    // 1. Manejar el campo condicional "Hijos"
=======

>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
    form.addEventListener('change', (e) => {
        if (e.target.name === 'hasChildren') {
            toggleChildrenInput(e.target.value === 'yes');
        }
<<<<<<< HEAD
    });

    // 2. Manejar el envío del formulario
    form.onsubmit = (e) => {
        e.preventDefault();
        
=======
        if (e.target.name) {
            clearFieldErrorFor(e.target.name);
        }
    });

    form.addEventListener('input', (e) => {
        if (e.target.name === 'dob') {
            updateAgeFromDob();
        }
        if (e.target.name) {
            clearFieldErrorFor(e.target.name);
        }
    });

    form.onsubmit = (e) => {
        e.preventDefault();

>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
        const data = getPersonFormData(form);
        const validation = validatePerson(data);

        if (validation.isValid) {
<<<<<<< HEAD
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
=======
            clearFieldErrors();
            savePerson(withCalculatedAge(data));
            showAlert('¡Registro guardado correctamente!');
            renderPeople(getAllPeople());
            form.reset();
            document.querySelector('input[name="hasChildren"][value="no"]').checked = true;
            toggleChildrenInput(false);
            updateAgeFromDob();
            return;
        }

        showFieldErrors(validation.fieldErrors);

        const resumen =
            validation.errors.length === 1
                ? validation.errors[0]
                : `Hay ${validation.errors.length} errores en el formulario. Revisá los campos marcados.`;

        showAlert(resumen, 'error');
    };
}

function updateAgeFromDob() {
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');
    const dob = dobInput.value;

    if (!dob) {
        ageInput.value = '';
        return;
    }

    const dobDate = new Date(`${dob}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(dobDate.getTime()) || dobDate > today) {
        ageInput.value = '';
        return;
    }

    ageInput.value = `${calcAgeFromDob(dob)} años`;
}

function clearFieldErrorFor(fieldName) {
    const errorEl = document.getElementById(`error-${fieldName}`);
    const group = document.querySelector(`[data-field="${fieldName}"]`);
    if (errorEl) errorEl.textContent = '';
    if (group) group.classList.remove('has-error');
}
>>>>>>> 694d37d6e454de3fb4e702b0ce0662cc9f14d405
