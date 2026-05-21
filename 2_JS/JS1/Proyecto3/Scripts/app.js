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
    renderPeople(getAllPeople());
    setupApp();
});

function setupApp() {
    const form = document.getElementById('person-form');

    form.addEventListener('change', (e) => {
        if (e.target.name === 'hasChildren') {
            toggleChildrenInput(e.target.value === 'yes');
        }
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

        const data = getPersonFormData(form);
        const validation = validatePerson(data);

        if (validation.isValid) {
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
