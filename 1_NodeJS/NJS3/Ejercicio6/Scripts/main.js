import { getFormData, validateForm, displayUserData } from '/Modules/formHandler.js';

const form = document.getElementById('registrationForm');
const resultContainer = document.getElementById('resultContainer');
const btnReset = document.getElementById('btnReset');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm(form)) {
        const data = getFormData(form);
        displayUserData('userDataDisplay', data);
        
        // Mostrar contenedor de resultado con animación
        resultContainer.classList.remove('d-none');
        resultContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Deshabilitar formulario para simular envío exitoso
        form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
    }
});

btnReset.addEventListener('click', () => {
    form.reset();
    form.classList.remove('was-validated');
    form.querySelectorAll('input, select, button').forEach(el => el.disabled = false);
    resultContainer.classList.add('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
