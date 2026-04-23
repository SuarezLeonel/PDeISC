export const createElement = (containerId, type, text, className, groupClass) => {
    const container = document.getElementById(containerId);
    const element = document.createElement(type);
    
    // Usamos una clase de grupo para poder identificar todos los elementos del mismo tipo
    element.className = `${className} ${groupClass}`;
    element.textContent = text;
    
    if (type === 'a') {
        element.href = '#';
        element.target = '_blank';
    }
    
    container.appendChild(element);
    return `Elemento <${type}> creado en el grupo: ${groupClass}`;
};

export const modifyElementsByGroup = (groupClass, attribute, value) => {
    const elements = document.querySelectorAll(`.${groupClass}`);
    if (elements.length === 0) return `Error: No se encontraron elementos en el grupo ${groupClass}.`;
    
    elements.forEach(element => {
        if (attribute === 'class') {
            // Para clases, mantenemos la clase de grupo y agregamos/reemplazamos las nuevas
            element.className = `${value} ${groupClass}`;
        } else if (attribute === 'disabled') {
            element.disabled = true;
        } else {
            element.setAttribute(attribute, value);
        }
    });
    
    return `Grupo ${groupClass}: ${attribute} actualizado en ${elements.length} elementos.`;
};

export const appendLog = (containerId, message) => {
    const container = document.getElementById(containerId);
    const logEntry = document.createElement('div');
    logEntry.textContent = `> ${message}`;
    container.prepend(logEntry);
};
