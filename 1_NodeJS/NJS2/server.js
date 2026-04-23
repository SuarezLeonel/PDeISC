/**
 * SERVIDOR PRINCIPAL - METEONODE
 * Este archivo coordina el funcionamiento del servidor HTTP, gestiona las rutas,
 * sirve archivos estáticos e inyecta componentes dinámicos en las páginas HTML.
 */

import http from 'http'; // Módulo nativo para crear el servidor web
import fs from 'fs/promises'; // Módulo nativo para interactuar con el sistema de archivos (versión asíncrona)
import path from 'path'; // Módulo nativo para manejar rutas de archivos y directorios
import { fileURLToPath } from 'url'; // Función para convertir URLs de módulos ES a rutas de sistema
  
// Importación de módulos personalizados (Lógica de negocio atomizada)
import { generateMenu } from './Modules/menu.js'; // Genera el HTML de la navegación
import { getWeatherData } from './Modules/weather.js'; // Provee datos meteorológicos
import { getTempDifference } from './Modules/calculator.js'; // Realiza cálculos matemáticos
import { logRequestDetails } from './Modules/logger.js'; // Registra detalles de las peticiones en consola
  
// Configuración de rutas base para ES Modules (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
  
const PORT = 3000; // Puerto donde escuchará el servidor
  
/**
 * Crea la instancia del servidor HTTP
 * @param req Objeto de petición (información que envía el navegador)
 * @param res Objeto de respuesta (métodos para enviar datos al navegador)
 */
const server = http.createServer(async (req, res) => { 
     // Registra la información de la URL solicitada en la consola del servidor
     logRequestDetails(req); 
  
     const url = req.url;

     // --- MANEJO DE ARCHIVOS ESTÁTICOS (CSS, Imágenes, Favicons) ---
    if (url.startsWith('/Styles/')) {
         try {
            // Construye la ruta absoluta al archivo solicitado
            const filePath = path.join(__dirname, url);
            const ext = path.extname(filePath);
            
            // Define el tipo de contenido según la extensión del archivo
            const mimeTypes = {
                '.css': 'text/css',
                '.ico': 'image/x-icon',
                '.webp': 'image/webp'
            };
            
            // Lee el archivo binario y lo envía con el Content-Type correcto
            const content = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            res.end(content);
            return; // Finaliza la ejecución para esta petición
        } catch (error) {
            res.writeHead(404);
            res.end('Archivo no encontrado');
            return;
        }
    }
  
     // --- ENRUTAMIENTO DE PÁGINAS HTML ---
     let filePath = ''; 
  
     // Decide qué archivo HTML cargar basado en la URL solicitada
     switch (url) { 
         case '/': 
         case '/index': 
             filePath = path.join(__dirname, 'Pages', 'index.html'); 
             break; 
         case '/clima': 
             filePath = path.join(__dirname, 'Pages', 'clima.html'); 
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
             // Si la ruta no existe, redirige al Inicio por defecto
             filePath = path.join(__dirname, 'Pages', 'index.html'); 
     } 
  
     try { 
         // Lee el contenido del archivo HTML seleccionado como texto (utf-8)
         let content = await fs.readFile(filePath, 'utf-8'); 
          
         // --- PROCESAMIENTO DINÁMICO (Inyección de Componentes) ---
         
         // Genera el menú común para todas las páginas
         const menuHtml = generateMenu(); 
         
         let weatherHtml = ''; // Contendrá el HTML del clima si corresponde
         let calcHtml = '';    // Contendrá el HTML de cálculos si corresponde

         // Lógica específica por página
         if (url === '/clima') {
             // Obtiene datos solo para Mar del Plata
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
             // Obtiene datos de múltiples ciudades para comparar
             const mdp = getWeatherData("Mar del Plata");
             const ba = getWeatherData("Buenos Aires");
             const rio = getWeatherData("Rio de Janeiro");

             // Crea la grilla de tarjetas de ciudades
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

             // Utiliza el módulo calculator.js para procesar las diferencias
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
  
         // REEMPLAZO DE PLACEHOLDERS: Sustituye las marcas {{...}} por el HTML real generado
         content = content.replace('{{MENU}}', menuHtml); 
         content = content.replace('{{WEATHER}}', weatherHtml); 
         content = content.replace('{{CALC}}', calcHtml); 
  
         // Envía la página final procesada al navegador
         res.writeHead(200, { 'Content-Type': 'text/html' }); 
         res.end(content); 
     } catch (error) { 
         // Manejo de errores catastróficos (ej: archivo HTML no encontrado o error en módulos)
         res.writeHead(500); 
         res.end('Error interno del servidor'); 
     } 
 }); 
  
 // Inicia el servidor y lo pone en modo de escucha
 server.listen(PORT, () => { 
     console.log(`Servidor corriendo en http://localhost:${PORT}`); 
 }); 
