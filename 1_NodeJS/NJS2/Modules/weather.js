/** 
  * Módulo para gestionar datos del clima de diferentes ciudades
  */ 
 export const getWeatherData = (city = "Mar del Plata") => { 
     const citiesData = {
         "Mar del Plata": { temp: 18, condition: "Parcialmente nublado" },
         "Buenos Aires": { temp: 24, condition: "Despejado" },
         "Rio de Janeiro": { temp: 30, condition: "Soleado" }
     };

     const data = citiesData[city] || { temp: 20, condition: "N/A" };
  
     return { 
         city: city, 
         temp: data.temp, 
         condition: data.condition, 
         date: new Date().toLocaleDateString() 
     }; 
 }; 
