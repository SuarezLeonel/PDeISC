import { createServer } from 'http';

const server = createServer((req, res) => {
  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Resultados</title>
        <style>
          body { font-family: Arial; }
          table { border-collapse: collapse; margin: 20px; }
          td, th { border: 1px solid black; padding: 10px; }
          th { background: #ddd; }
        </style>
      </head>
      <body>
        <h1>Resultados</h1>
        <table>
          <tr><th>Operación</th><th>Resultado</th></tr>
          <tr><td>5 + 3</td><td>${5 + 3}</td></tr>
          <tr><td>8 - 6</td><td>${8 - 6}</td></tr>
          <tr><td>3 * 11</td><td>${3 * 11}</td></tr>
          <tr><td>30 / 5</td><td>${30 / 5}</td></tr>
        </table>
      </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});