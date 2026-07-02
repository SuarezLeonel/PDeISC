// Ejercicio en clase: información básica del sistema
import os from 'os';

console.log('Sistema operativo:', os.platform());
console.log('Arquitectura:', os.arch());
console.log('Usuario:', os.userInfo().username);
console.log('Memoria total (GB):', (os.totalmem() / 1024 ** 3).toFixed(2));
console.log('Memoria libre (GB):', (os.freemem() / 1024 ** 3).toFixed(2));
