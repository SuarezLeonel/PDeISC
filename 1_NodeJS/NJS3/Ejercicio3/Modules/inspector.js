export const getChildCount = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return 0;
    return container.children.length;
};

export const displayResult = (displayId, count) => {
    const display = document.getElementById(displayId);
    if (display) {
        display.classList.remove('d-none');
        display.innerHTML = `Total de elementos hijos: <span class="fw-bold">${count}</span>`;
    }
};
