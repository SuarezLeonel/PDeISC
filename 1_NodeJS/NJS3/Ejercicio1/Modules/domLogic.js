/**
 * Modifica el texto de un elemento
 */
export const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
};

/**
 * Modifica el color (clase) de un elemento
 */
export const setTextColor = (id, colorClass) => {
    const el = document.getElementById(id);
    if (el) {
        // Limpiamos clases de color previas de Bootstrap
        el.classList.remove('text-primary', 'text-success', 'text-danger', 'text-warning', 'text-info');
        el.classList.add(colorClass);
    }
};

/**
 * Modifica el src de una imagen
 */
export const setImageSrc = (id, src) => {
    const el = document.getElementById(id);
    if (el) el.src = src;
};

/**
 * Modifica el ancho de un elemento
 */
export const setElementWidth = (id, width) => {
    const el = document.getElementById(id);
    if (el) el.style.width = width;
};
