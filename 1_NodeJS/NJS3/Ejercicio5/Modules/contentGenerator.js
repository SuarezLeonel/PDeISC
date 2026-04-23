/**
 * Genera el HTML de una tarjeta (card) de Bootstrap sin el botón "Ver más"
 */
export const createCardHtml = (id, title, description, imageUrl, typeClass) => {
    return `
        <div class="col-md-4 col-lg-3 news-item ${typeClass}">
            <div class="card h-100 border-0 shadow-sm card-hover">
                <img src="${imageUrl}?sig=${id}" class="card-img-top rounded-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${title}</h5>
                    <p class="card-text small text-muted">${description}</p>
                </div>
            </div>
        </div>
    `;
};

/**
 * Genera noticias de fútbol
 */
export const renderFootballNews = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    let footballHtml = '';
    for (let i = 1; i <= 6; i++) {
        footballHtml += createCardHtml(
            `fb-${i}`, 
            'Noticia Fútbol ' + i, 
            'Información actualizada sobre el mundo del deporte rey y los últimos resultados.',
            'https://picsum.photos/300/200',
            'news-football'
        );
    }
    container.innerHTML += footballHtml;
};

/**
 * Genera noticias tech
 */
export const renderTechNews = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    let techHtml = '';
    for (let i = 1; i <= 6; i++) {
        techHtml += createCardHtml(
            `tech-${i}`, 
            'Noticia Tech ' + i, 
            'Las últimas innovaciones en inteligencia artificial, gadgets y desarrollo de software.',
            'https://picsum.photos/301/201',
            'news-tech'
        );
    }
    container.innerHTML += techHtml;
};

/**
 * Limpia noticias por categoría
 */
export const clearNewsByCategory = (categoryClass) => {
    const items = document.querySelectorAll(`.${categoryClass}`);
    items.forEach(item => item.remove());
};

export const clearAllContent = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '';
};
