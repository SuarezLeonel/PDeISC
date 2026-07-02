// Ejercicio en clase: fecha y hora actual
const ahora = new Date();

console.log('Fecha:', ahora.toLocaleDateString('es-AR'));
console.log('Hora:', ahora.toLocaleTimeString('es-AR'));
console.log('ISO:', ahora.toISOString());
