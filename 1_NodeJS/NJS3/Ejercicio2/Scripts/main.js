import { updateLog, toggleClass } from '/Modules/eventLogic.js';

// 1. CLICK
document.getElementById('btnClick').addEventListener('click', () => {
    updateLog('logClick', '¡Botón pulsado con éxito!', 'text-primary fw-bold');
});

// 2. MOUSEOVER / MOUSEOUT
const hoverCard = document.getElementById('cardHover');
hoverCard.addEventListener('mouseover', () => {
    updateLog('logHover', 'Estado: ¡Mouse Encima!', 'text-success fw-bold');
    hoverCard.style.transform = 'scale(1.02)';
});
hoverCard.addEventListener('mouseout', () => {
    updateLog('logHover', 'Estado: Normal', 'text-muted');
    hoverCard.style.transform = 'scale(1)';
});

// 3. FOCUS / BLUR
const focusInput = document.getElementById('inputFocus');
focusInput.addEventListener('focus', () => {
    updateLog('logFocus', 'Estado: Escribiendo...', 'text-danger fw-bold');
});
focusInput.addEventListener('blur', () => {
    updateLog('logFocus', 'Estado: Fuera de foco', 'text-muted');
});

// 4. DOUBLE CLICK
document.getElementById('boxDblClick').addEventListener('dblclick', () => {
    toggleClass('boxDblClick', 'bg-info', 'bg-dark');
});

// 5. KEYDOWN
document.getElementById('inputKey').addEventListener('keydown', (e) => {
    const log = document.getElementById('logKey');
    log.innerText = `Última tecla: ${e.key.toUpperCase()}`;
    log.classList.add('text-warning');
});
