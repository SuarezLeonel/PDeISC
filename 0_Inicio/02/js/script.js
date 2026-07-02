/**
 * script.js
 * Validación del formulario de contacto.
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('successAlert');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity()) {
                successAlert.classList.remove('d-none');
                form.reset();
                form.classList.remove('was-validated');
                setTimeout(() => {
                    successAlert.classList.add('d-none');
                }, 5000);
            } else {
                form.classList.add('was-validated');
                successAlert.classList.add('d-none');
            }
        }, false);
    }
});
