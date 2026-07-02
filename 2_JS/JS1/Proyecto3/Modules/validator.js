/**
 * Módulo de validación avanzada
 */

export const validatePerson = (data) => {
    const errors = [];

    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push("Formato de Email inválido.");
    }

    // Validar Edad lógica (0-120)
    const age = parseInt(data.age);
    if (isNaN(age) || age < 0 || age > 120) {
        errors.push("La edad debe ser un número entre 0 y 120.");
    }

    // Validar DNI (8 dígitos como ejemplo)
    if (!/^\d{7,10}$/.test(data.dni)) {
        errors.push("El documento debe tener entre 7 y 10 dígitos numéricos.");
    }

    // Validar Teléfono (mínimo 8 dígitos)
    if (data.phone.replace(/\D/g, '').length < 8) {
        errors.push("El teléfono debe tener al menos 8 dígitos.");
    }

    // Validar campos vacíos obligatorios
    const mandatory = ['firstName', 'lastName', 'dob', 'civilStatus', 'nationality'];
    mandatory.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`El campo ${field} es obligatorio.`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};