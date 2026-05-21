/**
 * Módulo de Utilidades UI - Proyecto 3
 */

export const initTheme = () => {
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('p3-theme') || 'light';
    
    html.setAttribute('data-theme', saved);
    btn.textContent = saved === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';

    btn.onclick = () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('p3-theme', next);
        btn.textContent = next === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    };
};

const COUNTRIES = [
    'Afganistan', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda',
    'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaiyan', 'Bahamas', 'Banglades', 'Barbados', 'Barein', 'Belgica',
    'Belice', 'Benin', 'Bielorrusia', 'Birmania', 'Bolivia',
    'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunei', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Butan', 'Cabo Verde', 'Camboya', 'Camerun',
    'Canada', 'Catar', 'Chad', 'Chile', 'China', 'Chipre', 'Colombia',
    'Comoras', 'Corea del Norte', 'Corea del Sur', 'Costa de Marfil',
    'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'Ecuador',
    'Egipto', 'El Salvador', 'Emiratos Arabes Unidos', 'Eritrea', 'Eslovaquia',
    'Eslovenia', 'Espana', 'Estados Unidos', 'Estonia', 'Esuatini', 'Etiopia',
    'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabon', 'Gambia', 'Georgia',
    'Ghana', 'Granada', 'Grecia', 'Guatemala', 'Guinea', 'Guinea-Bisau',
    'Guinea Ecuatorial', 'Guyana', 'Haiti', 'Honduras', 'Hungria', 'India',
    'Indonesia', 'Irak', 'Iran', 'Irlanda', 'Islandia', 'Islas Marshall',
    'Islas Salomon', 'Israel', 'Italia', 'Jamaica', 'Japon', 'Jordania',
    'Kazajistan', 'Kenia', 'Kirguistan', 'Kiribati', 'Kuwait', 'Laos',
    'Lesoto', 'Letonia', 'Libano', 'Liberia', 'Libia', 'Liechtenstein',
    'Lituania', 'Luxemburgo', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas',
    'Mali', 'Malta', 'Marruecos', 'Mauricio', 'Mauritania', 'Mexico',
    'Micronesia', 'Moldavia', 'Monaco', 'Mongolia', 'Montenegro', 'Mozambique',
    'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Niger', 'Nigeria', 'Noruega',
    'Nueva Zelanda', 'Oman', 'Paises Bajos', 'Pakistan', 'Palaos', 'Panama',
    'Papua Nueva Guinea', 'Paraguay', 'Peru', 'Polonia', 'Portugal',
    'Reino Unido', 'Republica Centroafricana', 'Republica Checa',
    'Republica del Congo', 'Republica Democratica del Congo',
    'Republica Dominicana', 'Ruanda', 'Rumania', 'Rusia', 'Samoa',
    'San Cristobal y Nieves', 'San Marino', 'San Vicente y las Granadinas',
    'Santa Lucia', 'Santo Tome y Principe', 'Senegal', 'Serbia', 'Seychelles',
    'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Sudafrica',
    'Sudan', 'Sudan del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia',
    'Tanzania', 'Tayikistan', 'Timor Oriental', 'Togo', 'Tonga',
    'Trinidad y Tobago', 'Tunez', 'Turkmenistan', 'Turquia', 'Tuvalu',
    'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Ciudad del Vaticano', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti',
    'Zambia', 'Zimbabue'
];

export const populateNationalitySelect = () => {
    const select = document.getElementById('nationality');
    if (!select) return;

    COUNTRIES.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        select.appendChild(option);
    });
};

/**
 * Muestra/Oculta el campo de hijos dinámicamente
 */
export const toggleChildrenInput = (show) => {
    const group = document.getElementById('children-count-group');
    const input = document.getElementById('childrenCount');
    if (show) {
        group.classList.remove('hidden');
        input.required = true;
    } else {
        group.classList.add('hidden');
        input.required = false;
        input.value = '';
    }
};

/**
 * Renderiza la lista de personas desde el localStorage
 */
export const renderPeople = (people) => {
    const list = document.getElementById('registry-list');
    list.innerHTML = '';
    
    if (people.length === 0) {
        list.innerHTML = '<p class="empty-msg">No hay registros guardados.</p>';
        return;
    }

    people.forEach(p => {
        const div = document.createElement('div');
        div.className = 'person-item';
        const childrenText = p.hasChildren === 'yes'
            ? `${p.childrenCount || 0} hijo(s)`
            : 'No tiene';

        div.innerHTML = `
            <h3>${p.firstName.toUpperCase()} ${p.lastName.toUpperCase()}</h3>
            <p><strong>Edad:</strong> ${p.age} años</p>
            <p><strong>Fecha de Nacimiento:</strong> ${p.dob}</p>
            <p><strong>Sexo:</strong> ${p.sex}</p>
            <p><strong>Estado Civil:</strong> ${p.civilStatus}</p>
            <p><strong>Nacionalidad:</strong> ${p.nationality}</p>
            <p><strong>Telefono:</strong> ${p.phone}</p>
            <p><strong>Email:</strong> ${p.email}</p>
            <p><strong>DNI:</strong> ${p.dni}</p>
            <p><strong>Hijos:</strong> ${childrenText}</p>
        `;
        list.prepend(div);
    });
};

/**
 * Muestra alertas dinámicas (Toast)
 */
export const showAlert = (msg, type = 'success') => {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
        t.style.opacity = '0';
        setTimeout(() => t.remove(), 300);
    }, 3500);
};

export const getPersonFormData = (form) => {
    const fd = new FormData(form);
    return Object.fromEntries(fd.entries());
};

const FIELD_IDS = [
    'firstName', 'lastName', 'age', 'dob', 'sex', 'dni',
    'civilStatus', 'nationality', 'phone', 'email', 'hasChildren', 'childrenCount'
];

export const clearFieldErrors = () => {
    FIELD_IDS.forEach((field) => {
        const errorEl = document.getElementById(`error-${field}`);
        const group = document.querySelector(`[data-field="${field}"]`);
        if (errorEl) errorEl.textContent = '';
        if (group) group.classList.remove('has-error');
    });
};

export const showFieldErrors = (fieldErrors = {}) => {
    clearFieldErrors();

    Object.entries(fieldErrors).forEach(([field, message]) => {
        const errorEl = document.getElementById(`error-${field}`);
        const group = document.querySelector(`[data-field="${field}"]`);
        if (errorEl) errorEl.textContent = message;
        if (group) group.classList.add('has-error');
    });

    const firstInvalid = document.querySelector('.form-group.has-error');
    if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
