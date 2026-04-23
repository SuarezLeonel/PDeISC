import { setText, setTextColor, setImageSrc, setElementWidth } from '/Modules/domLogic.js';

const titleId = 'mainTitle';
const imageId = 'mainImage';

document.getElementById('btnToggleText').addEventListener('click', () => {
    const title = document.getElementById(titleId);
    const nextText = title.innerText === 'Hola DOM' ? 'Chau DOM' : 'Hola DOM';
    setText(titleId, nextText);
});

document.getElementById('btnToggleColor').addEventListener('click', () => {
    const colors = ['text-primary', 'text-success', 'text-danger', 'text-warning', 'text-info'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTextColor(titleId, randomColor);
});

document.getElementById('btnAddImage').addEventListener('click', () => {
    if (!document.getElementById(imageId)) {
        const container = document.getElementById('imageContainer');
        const img = document.createElement('img');
        img.id = imageId;
        img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZaEN3LJ3Tl9ZgKtmYrZB6LQb76xlh6yeIQ&s';
        img.alt = 'Placeholder';
        img.className = 'img-fluid rounded shadow-sm';
        img.style.width = '300px';
        img.style.transition = 'all 0.3s ease';
        container.appendChild(img);
        
        // Habilitar botones de manipulación
        document.getElementById('btnToggleImage').disabled = false;
        document.getElementById('btnToggleSize').disabled = false;
        document.getElementById('btnAddImage').disabled = true;
        document.getElementById('btnAddImage').innerText = 'Imagen Agregada';
    }
});

document.getElementById('btnToggleImage').addEventListener('click', () => {
    const img = document.getElementById(imageId);
    if (!img) return;
    
    const src1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZaEN3LJ3Tl9ZgKtmYrZB6LQb76xlh6yeIQ&s';
    const src2 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png';
    
    const newSrc = img.src.includes('Node.js_logo') ? src1 : src2;
    setImageSrc(imageId, newSrc);
});

document.getElementById('btnToggleSize').addEventListener('click', () => {
    const img = document.getElementById(imageId);
    if (!img) return;
    
    const nextWidth = img.style.width === '300px' ? '450px' : '300px';
    setElementWidth(imageId, nextWidth);
});
