import { renderFootballNews, renderTechNews, clearNewsByCategory, clearAllContent } from '/Modules/contentGenerator.js';

const gridId = 'contentGrid';

// Generación
document.getElementById('btnFootball').addEventListener('click', () => {
    renderFootballNews(gridId);
});

document.getElementById('btnTech').addEventListener('click', () => {
    renderTechNews(gridId);
});

// Limpieza selectiva
document.getElementById('btnClearFootball').addEventListener('click', () => {
    clearNewsByCategory('news-football');
});

document.getElementById('btnClearTech').addEventListener('click', () => {
    clearNewsByCategory('news-tech');
});

// Limpieza total
document.getElementById('btnClearAll').addEventListener('click', () => {
    clearAllContent(gridId);
});
