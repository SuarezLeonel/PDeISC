import { URL } from 'url'; 
  
 /** 
  * Loguea información detallada de la URL solicitada 
  */ 
 export const logRequestDetails = (req) => { 
     const fullUrl = new URL(req.url, `http://${req.headers.host}`); 
      
     console.log("--- Información de URL ---"); 
     console.log(`Host: ${fullUrl.host}`); 
     console.log(`Path: ${fullUrl.pathname}`); 
     console.log(`Búsqueda: ${fullUrl.search}`); 
     console.log("--------------------------"); 
 }; 
