/**
 * Captura los datos del formulario y los devuelve como un objeto
 */
export const getFormData = (form) => {
    const formData = new FormData(form);
    return {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('userEmail').value,
        age: document.getElementById('userAge').value,
        country: document.getElementById('userCountry').value,
        gender: form.querySelector('input[name="gender"]:checked')?.value || 'No especificado'
    };
};

/**
 * Valida si el formulario cumple con las restricciones de HTML5
 */
export const validateForm = (form) => {
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    return true;
};

/**
 * Renderiza los datos en la tarjeta de resultado
 */
export const displayUserData = (containerId, data) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="mb-3">
            <small class="text-white-50 d-block">Nombre Completo</small>
            <span class="h5">${data.fullName}</span>
        </div>
        <div class="mb-3">
            <small class="text-white-50 d-block">Email</small>
            <span>${data.email}</span>
        </div>
        <div class="row">
            <div class="col-6 mb-3">
                <small class="text-white-50 d-block">Edad</small>
                <span>${data.age} años</span>
            </div>
            <div class="col-6 mb-3">
                <small class="text-white-50 d-block">Género</small>
                <span>${data.gender}</span>
            </div>
        </div>
        <div class="mb-1">
            <small class="text-white-50 d-block">País</small>
            <span>${data.country}</span>
        </div>
    `;
};
