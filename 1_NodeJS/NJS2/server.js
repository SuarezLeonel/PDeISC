import http from 'http'; 
 import fs from 'fs/promises'; 
 import path from 'path'; 
 import { fileURLToPath } from 'url'; 
  
 // Importación de módulos propios 
 import { generateMenu } from './Modules/menu.js'; 
 import { getWeatherData } from './Modules/weather.js'; 
 import { getTempDifference } from './Modules/calculator.js'; 
 import { logRequestDetails } from './Modules/logger.js'; 
  
 const __filename = fileURLToPath(import.meta.url); 
 const __dirname = path.dirname(__filename); 
  
 const PORT = 3000; 
  
 const server = http.createServer(async (req, res) => { 
     // Requerimiento 3: Mostrar info de URL por consola 
     logRequestDetails(req); 
  
     const url = req.url;

     // Servir archivos estáticos
    if (url.startsWith('/Styles/')) {
         try {
             const filePath = path.join(__dirname, url);
            const ext = path.extname(filePath);
            const mimeTypes = {
                '.css': 'text/css',
                '.ico': 'image/x-icon',
                '.webp': 'image/webp'
            };
            const content = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            res.end(content);
            return;
        } catch (error) {
            res.writeHead(404);
            res.end('Archivo no encontrado');
            return;
        }
    }
  
     // Rutas básicas 
     let filePath = ''; 
  
     // Validación de rutas para servir HTML (Requerimiento 2 y 5) 
     switch (url) { 
         case '/': 
         case '/index': 
             filePath = path.join(__dirname, 'Pages', 'index.html'); 
             break; 
         case '/clima': 
             filePath = path.join(__dirname, 'Pages', 'clima.html'); 
             break; 
         case '/servicios': 
             filePath = path.join(__dirname, 'Pages', 'servicios.html'); 
             break; 
         case '/comparativa': 
             filePath = path.join(__dirname, 'Pages', 'comparativa.html'); 
             break; 
         case '/nosotros': 
             filePath = path.join(__dirname, 'Pages', 'nosotros.html'); 
             break; 
         case '/blog': 
             filePath = path.join(__dirname, 'Pages', 'blog.html'); 
             break; 
         default: 
             filePath = path.join(__dirname, 'Pages', 'index.html'); 
     } 
  
     try { 
         // Lectura de archivo con File System (FS) 
         let content = await fs.readFile(filePath, 'utf-8'); 
          
         // Inyección dinámica de componentes según la ruta
         const menuHtml = generateMenu(); 
         
         let weatherHtml = '';
         let calcHtml = '';

         if (url === '/clima') {
             // Solo el clima para Mar del Plata en la sección de Tiempo
             const weather = getWeatherData("Mar del Plata");
             weatherHtml = `<div class="row justify-content-center">
                                 <div class="col-11 col-sm-9 col-md-6 col-lg-4">
                                     <div class="card shadow-sm border-0 rounded-4 text-center p-4">
                                         <h3 class="card-title text-primary text-uppercase mb-3">${weather.city}</h3> 
                                         <p class="display-4 fw-bold text-dark mb-0">${weather.temp}°C</p> 
                                         <p class="text-muted mt-2">${weather.condition}</p>
                                     </div>
                                 </div>
                               </div>`;
         } else if (url === '/comparativa') {
             // Clima de múltiples ciudades y el cálculo de diferencias en la sección de Comparativa
             const mdp = getWeatherData("Mar del Plata");
             const ba = getWeatherData("Buenos Aires");
             const rio = getWeatherData("Rio de Janeiro");

             weatherHtml = `
                <div class="row g-4 justify-content-center mt-4">
                    <div class="col-md-4">
                        <div class="card shadow-sm border-0 rounded-4 text-center p-4">
                            <h4 class="text-primary">${mdp.city}</h4>
                            <p class="h2 fw-bold">${mdp.temp}°C</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card shadow-sm border-0 rounded-4 text-center p-4">
                            <h4 class="text-primary">${ba.city}</h4>
                            <p class="h2 fw-bold">${ba.temp}°C</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card shadow-sm border-0 rounded-4 text-center p-4">
                            <h4 class="text-primary">${rio.city}</h4>
                            <p class="h2 fw-bold">${rio.temp}°C</p>
                        </div>
                    </div>
                </div>`;

             calcHtml = `
                <div class="card bg-dark text-white shadow border-0 rounded-4 mt-5 p-4 overflow-hidden position-relative">
                    <div class="card-body position-relative" style="z-index: 2;">
                        <h3 class="text-warning mb-4">Análisis de Diferencias Térmicas</h3>
                        <p class="lead mb-2">MDP vs BSAS: <strong class="text-warning">${getTempDifference(mdp.temp, ba.temp)}°C</strong> de diferencia.</p>
                        <p class="lead">MDP vs RIO: <strong class="text-warning">${getTempDifference(mdp.temp, rio.temp)}°C</strong> de diferencia.</p>
                    </div>
                    <div class="position-absolute top-0 end-0 h-100 w-100" style="background: radial-gradient(circle at top right, rgba(60, 110, 113, 0.2), transparent 70%);"></div>
                </div>`;
         }
  
         // Reemplazo de placeholders
         content = content.replace('{{MENU}}', menuHtml); 
         content = content.replace('{{WEATHER}}', weatherHtml); 
         content = content.replace('{{CALC}}', calcHtml); 
  
         res.writeHead(200, { 'Content-Type': 'text/html' }); 
         res.end(content); 
     } catch (error) { 
         res.writeHead(500); 
         res.end('Error interno del servidor'); 
     } 
 }); 
  
 server.listen(PORT, () => { 
     console.log(`Servidor corriendo en http://localhost:${PORT}`); 
 }); 
