import { copiarPrimerosTres, copiarPeliculasParcial, copiarUltimosTres } from '../Modules/arrayMethods.js';

// 1. Números
const nums = [10, 20, 30, 40, 50, 60];
const btnNums = document.getElementById('btn-nums');
const resNums = document.getElementById('res-nums');
const numsDisplay = document.getElementById('nums-display');

// Inicialización
if (numsDisplay) numsDisplay.innerText = `Números: ${JSON.stringify(nums)}`;

btnNums.addEventListener('click', () => {
    const copia = copiarPrimerosTres(nums);
    resNums.innerText = `Copia generada: ${JSON.stringify(copia)}`;
    btnNums.disabled = true;
});

// 2. Películas
const movies = ["Batman", "Superman", "Iron Man", "Spiderman", "Thor", "Hulk"];
const btnMovies = document.getElementById('btn-movies');
const resMovies = document.getElementById('res-movies');
const moviesDisplay = document.getElementById('movies-display');

// Inicialización
if (moviesDisplay) moviesDisplay.innerText = `Películas: ${JSON.stringify(movies)}`;

btnMovies.addEventListener('click', () => {
    const copia = copiarPeliculasParcial(movies);
    resMovies.innerText = `Copia generada: ${JSON.stringify(copia)}`;
    btnMovies.disabled = true;
});

// 3. Superhéroes (Últimos 3)
const superheroes = ["Wolverine", "Flash", "Wonder Woman", "Black Widow", "Aquaman", "Cyclops"];
const btnLast = document.getElementById('btn-last');
const resLast = document.getElementById('res-last');
const lastDisplay = document.getElementById('last-display');

// Inicialización
if (lastDisplay) lastDisplay.innerText = `Superhéroes: ${JSON.stringify(superheroes)}`;

btnLast.addEventListener('click', () => {
    const copia = copiarUltimosTres(superheroes);
    resLast.innerText = `Copia generada: ${JSON.stringify(copia)}`;
    btnLast.disabled = true;
});
