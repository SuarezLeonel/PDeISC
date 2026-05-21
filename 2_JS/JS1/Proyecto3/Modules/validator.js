/**
 * Módulo de validación — todos los campos del registro
 */

const LABELS = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    age: 'Edad',
    dob: 'Fecha de nacimiento',
    sex: 'Sexo',
    dni: 'Documento (DNI)',
    civilStatus: 'Estado civil',
    nationality: 'Nacionalidad',
    phone: 'Teléfono',
    email: 'Email',
    hasChildren: '¿Tiene hijos?',
    childrenCount: 'Cantidad de hijos'
};

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DNI_REGEX = /^\d{7,10}$/;
const PHONE_REGEX = /^[\d\s().+-]{8,20}$/;
const CIVIL_STATUS = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'];
const SEX_VALUES = ['Masculino', 'Femenino'];

const isEmpty = (value) => value === undefined || value === null || String(value).trim() === '';

export const calcAgeFromDob = (dobStr) => {
    const birth = new Date(`${dobStr}T00:00:00`);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

const setError = (fieldErrors, field, message) => {
    if (!fieldErrors[field]) {
        fieldErrors[field] = message;
    }
};

export const validatePerson = (data) => {
    const fieldErrors = {};

    // Nombre
    if (isEmpty(data.firstName)) {
        setError(fieldErrors, 'firstName', `${LABELS.firstName} es obligatorio.`);
    } else if (!NAME_REGEX.test(data.firstName.trim())) {
        setError(fieldErrors, 'firstName', `${LABELS.firstName}: solo letras, mínimo 2 caracteres.`);
    }

    // Apellido
    if (isEmpty(data.lastName)) {
        setError(fieldErrors, 'lastName', `${LABELS.lastName} es obligatorio.`);
    } else if (!NAME_REGEX.test(data.lastName.trim())) {
        setError(fieldErrors, 'lastName', `${LABELS.lastName}: solo letras, mínimo 2 caracteres.`);
    }

    // Fecha de nacimiento (la edad se calcula solo a partir de esta fecha)
    if (isEmpty(data.dob)) {
        setError(fieldErrors, 'dob', `${LABELS.dob} es obligatoria.`);
    } else {
        const dobDate = new Date(`${data.dob}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (Number.isNaN(dobDate.getTime())) {
            setError(fieldErrors, 'dob', `${LABELS.dob} no es una fecha válida.`);
        } else if (dobDate > today) {
            setError(fieldErrors, 'dob', `${LABELS.dob} no puede ser futura.`);
        } else {
            const edadCalculada = calcAgeFromDob(data.dob);
            if (edadCalculada < 0 || edadCalculada > 120) {
                setError(fieldErrors, 'dob', `${LABELS.dob}: la edad resultante no puede superar los 120 años.`);
            }
        }
    }

    // Sexo
    if (isEmpty(data.sex) || !SEX_VALUES.includes(data.sex)) {
        setError(fieldErrors, 'sex', `Seleccioná un ${LABELS.sex.toLowerCase()} válido.`);
    }

    // DNI
    const dni = String(data.dni || '').trim();
    if (isEmpty(dni)) {
        setError(fieldErrors, 'dni', `${LABELS.dni} es obligatorio.`);
    } else if (!DNI_REGEX.test(dni)) {
        setError(fieldErrors, 'dni', `${LABELS.dni}: ingresá entre 7 y 10 dígitos numéricos.`);
    }

    // Estado civil
    if (isEmpty(data.civilStatus)) {
        setError(fieldErrors, 'civilStatus', `${LABELS.civilStatus} es obligatorio.`);
    } else if (!CIVIL_STATUS.includes(data.civilStatus)) {
        setError(fieldErrors, 'civilStatus', `${LABELS.civilStatus}: seleccioná una opción válida.`);
    }

    // Nacionalidad
    if (isEmpty(data.nationality)) {
        setError(fieldErrors, 'nationality', `${LABELS.nationality} es obligatoria.`);
    } else if (data.nationality.trim().length < 2) {
        setError(fieldErrors, 'nationality', `${LABELS.nationality}: seleccioná un país de la lista.`);
    }

    // Teléfono
    const phone = String(data.phone || '').trim();
    const phoneDigits = phone.replace(/\D/g, '');
    if (isEmpty(phone)) {
        setError(fieldErrors, 'phone', `${LABELS.phone} es obligatorio.`);
    } else if (!PHONE_REGEX.test(phone) || phoneDigits.length < 8 || phoneDigits.length > 15) {
        setError(
            fieldErrors,
            'phone',
            `${LABELS.phone}: ingresá entre 8 y 15 dígitos (podés usar guiones o espacios).`
        );
    }

    // Email
    const email = String(data.email || '').trim();
    if (isEmpty(email)) {
        setError(fieldErrors, 'email', `${LABELS.email} es obligatorio.`);
    } else if (!EMAIL_REGEX.test(email)) {
        setError(fieldErrors, 'email', `${LABELS.email}: formato inválido (ej: nombre@correo.com).`);
    } else if (email.length > 100) {
        setError(fieldErrors, 'email', `${LABELS.email}: máximo 100 caracteres.`);
    }

    // Hijos
    const hasChildren = data.hasChildren;
    if (hasChildren !== 'yes' && hasChildren !== 'no') {
        setError(fieldErrors, 'hasChildren', `Indicá si ${LABELS.hasChildren.toLowerCase()}.`);
    }

    // Cantidad de hijos (condicional)
    if (hasChildren === 'yes') {
        const count = parseInt(data.childrenCount, 10);
        if (isEmpty(data.childrenCount)) {
            setError(fieldErrors, 'childrenCount', `${LABELS.childrenCount} es obligatoria cuando tiene hijos.`);
        } else if (Number.isNaN(count) || !Number.isInteger(count) || count < 1 || count > 25) {
            setError(fieldErrors, 'childrenCount', `${LABELS.childrenCount}: número entero entre 1 y 25.`);
        }
    } else if (!isEmpty(data.childrenCount)) {
        setError(fieldErrors, 'childrenCount', `${LABELS.childrenCount} solo aplica si tiene hijos.`);
    }

    const errors = Object.values(fieldErrors);
    const edad = !fieldErrors.dob && data.dob ? calcAgeFromDob(data.dob) : null;

    return {
        isValid: errors.length === 0,
        errors,
        fieldErrors,
        age: edad
    };
};

/** Asigna la edad calculada desde la fecha de nacimiento antes de guardar. */
export const withCalculatedAge = (data) => ({
    ...data,
    age: String(calcAgeFromDob(data.dob))
});
