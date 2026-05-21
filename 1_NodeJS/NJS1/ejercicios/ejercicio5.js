import { createServer } from 'http';
import { sumar, restar, multiplicar, dividir } from './calculos.js';

const operaciones = [
  { nombre: 'Suma', expresion: '5 + 3', resultado: sumar(5, 3) },
  { nombre: 'Resta', expresion: '8 - 6', resultado: restar(8, 6) },
  { nombre: 'Multiplicación', expresion: '3 * 11', resultado: multiplicar(3, 11) },
  { nombre: 'División', expresion: '30 / 5', resultado: dividir(30, 5) },
];

const filas = operaciones
  .map(
    (op) => `
          <tr>
            <td>${op.nombre}</td>
            <td><code>${op.expresion}</code></td>
            <td class="resultado">${op.resultado}</td>
          </tr>`
  )
  .join('');

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de cálculos</title>
    <style>
      * { box-sizing: border-box; }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
        min-height: 100vh;
        margin: 0;
        padding: 2rem;
        color: #e2e8f0;
      }
      .contenedor {
        max-width: 640px;
        margin: 0 auto;
        background: #1e293b;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      }
      h1 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
        color: #38bdf8;
      }
      p.subtitulo { margin: 0 0 1.5rem; color: #94a3b8; font-size: 0.95rem; }
      table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border-radius: 8px;
      }
      th, td {
        padding: 0.85rem 1rem;
        text-align: left;
        border-bottom: 1px solid #334155;
      }
      th {
        background: #0f172a;
        color: #38bdf8;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 0.05em;
      }
      tr:hover td { background: #334155; }
      td.resultado {
        font-weight: 700;
        font-size: 1.1rem;
        color: #4ade80;
        text-align: right;
      }
      code {
        background: #0f172a;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <div class="contenedor">
      <h1>Resultados de operaciones</h1>
      <p class="subtitulo">Ejercicio 5 — módulo calculos.js</p>
      <table>
        <thead>
          <tr>
            <th>Operación</th>
            <th>Expresión</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>${filas}
        </tbody>
      </table>
    </div>
  </body>
</html>`;

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

const PUERTO = 3000;

server.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});
