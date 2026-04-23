/**
 * Actualiza el contenido de un log específico
 */
export const updateLog = (id, message, className = 'text-muted') => {
    const el = document.getElementById(id);
    if (el) {
        el.innerText = message;
        el.className = `event-log small mt-2 ${className}`;
    }
};

/**
 * Alterna clases de Bootstrap en un elemento
 */
export const toggleClass = (id, class1, class2) => {
    const el = document.getElementById(id);
    if (el) {
        if (el.classList.contains(class1)) {
            el.classList.replace(class1, class2);
        } else {
            el.classList.replace(class2, class1);
        }
    }
};
