import { upperCase } from "upper-case"; 
  
 /** 
  * Genera el menú de navegación para todas las páginas 
  */ 
 export const generateMenu = () => { 
     const links = [ 
         { name: "Inicio", url: "/" }, 
         { name: "Tiempo", url: "/clima" }, 
         { name: "Comparativa", url: "/comparativa" }, 
         { name: "Nosotros", url: "/nosotros" }, 
         { name: "Blog", url: "/blog" } 
     ]; 
  
     let html = `
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
         <div class="container">
             <a class="navbar-brand fw-bold" href="/">METEO<span class="text-primary">NODE</span></a>
             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>
             </button>
             <div class="collapse navbar-collapse" id="navbarNav">
                 <ul class="navbar-nav ms-auto">`;
         
     links.forEach(link => { 
         html += `<li class="nav-item"><a class="nav-link fw-semibold px-3" href="${link.url}">${upperCase(link.name)}</a></li>`; 
     }); 
     html += '</ul></div></div></nav>'; 
      
     return html; 
 }; 
