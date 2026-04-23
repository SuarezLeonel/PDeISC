import { createElement, modifyElementsByGroup, appendLog } from '/Modules/attributeManager.js';

const containerId = 'elementsContainer';
const logId = 'logContainer';

// 1. Enlace (a)
document.getElementById('btnCreateA').addEventListener('click', () => {
    const msg = createElement(containerId, 'a', 'Enlace Dinámico', 'btn btn-link', 'groupA');
    appendLog(logId, msg);
    document.getElementById('btnModifyA').disabled = false;
});
document.getElementById('btnModifyA').addEventListener('click', () => {
    const msg = modifyElementsByGroup('groupA', 'href', 'https://www.google.com');
    appendLog(logId, msg);
});

// 2. Div
document.getElementById('btnCreateDiv').addEventListener('click', () => {
    const msg = createElement(containerId, 'div', 'Soy un Div', 'p-3 border rounded bg-light', 'groupDiv');
    appendLog(logId, msg);
    document.getElementById('btnModifyDiv').disabled = false;
});
document.getElementById('btnModifyDiv').addEventListener('click', () => {
    const msg = modifyElementsByGroup('groupDiv', 'class', 'p-3 border rounded bg-success text-white');
    appendLog(logId, msg);
});

// 3. Párrafo (p)
document.getElementById('btnCreateP').addEventListener('click', () => {
    const msg = createElement(containerId, 'p', 'Texto de ejemplo...', 'mb-0', 'groupP');
    appendLog(logId, msg);
    document.getElementById('btnModifyP').disabled = false;
});
document.getElementById('btnModifyP').addEventListener('click', () => {
    const msg = modifyElementsByGroup('groupP', 'title', 'Este es un título dinámico');
    appendLog(logId, msg);
});

// 4. Imagen (img)
document.getElementById('btnCreateImg').addEventListener('click', () => {
    const msg = createElement(containerId, 'img', '', 'img-thumbnail', 'groupImg');
    // Obtenemos el último elemento creado para ponerle el src inicial
    const imgs = document.querySelectorAll('.groupImg');
    const lastImg = imgs[imgs.length - 1];
    lastImg.src = 'https://picsum.photos/100/100';
    lastImg.style.width = '100px';
    
    appendLog(logId, msg);
    document.getElementById('btnModifyImg').disabled = false;
});
document.getElementById('btnModifyImg').addEventListener('click', () => {
    const msg = modifyElementsByGroup('groupImg', 'src', 'https://picsum.photos/101/101');
    appendLog(logId, msg);
});

// 5. Botón
document.getElementById('btnCreateBtn').addEventListener('click', () => {
    const msg = createElement(containerId, 'button', 'Botón Nuevo', 'btn btn-secondary', 'groupBtn');
    appendLog(logId, msg);
    document.getElementById('btnModifyBtn').disabled = false;
});
document.getElementById('btnModifyBtn').addEventListener('click', () => {
    const msg = modifyElementsByGroup('groupBtn', 'disabled', true);
    appendLog(logId, msg);
});
