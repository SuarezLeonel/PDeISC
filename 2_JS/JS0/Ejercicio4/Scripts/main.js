import { eliminarPrimerEntero, eliminarPrimerMensaje, atenderCliente } from '../Modules/arrayMethods.js';

// 1. Enteros
let enteros = [1, 2, 3, 4, 5];
const enterosDisplay = document.getElementById('enteros-display');
const btnEnteros = document.getElementById('btn-enteros');

// Inicialización de la UI
enterosDisplay.innerText = `Enteros: ${JSON.stringify(enteros)}`;

// Evento para eliminar el primer entero (shift)
btnEnteros.addEventListener('click', () => {
    if (enteros.length > 0) {
        enteros = eliminarPrimerEntero(enteros);
        enterosDisplay.innerText = `Enteros: ${JSON.stringify(enteros)}`;
        
        // Desactivar si el array queda vacío
        if (enteros.length === 0) {
            btnEnteros.disabled = true;
            btnEnteros.innerText = 'Array vacío';
        }
    }
});

// 2. Chat
let chat = ['Hola', '¿Cómo estás?', 'Todo bien', 'Me alegro'];
const chatDisplay = document.getElementById('chat-display');
const btnChat = document.getElementById('btn-chat');
const msgChat = document.getElementById('msg-chat');

// Inicialización de la UI
chatDisplay.innerText = `Chat: ${JSON.stringify(chat)}`;

// Evento para eliminar el mensaje más antiguo (primero)
btnChat.addEventListener('click', () => {
    if (chat.length > 0) {
        const result = eliminarPrimerMensaje(chat);
        chat = result.newArr;
        chatDisplay.innerText = `Chat: ${JSON.stringify(chat)}`;
        msgChat.innerText = `Mensaje eliminado: "${result.eliminado}"`;
        
        // Desactivar si no quedan mensajes
        if (chat.length === 0) {
            btnChat.disabled = true;
            btnChat.innerText = 'Sin mensajes';
        }
    }
});

// 3. Cola
let cola = ['Carlos', 'Marta', 'Luis', 'Sofia'];
const colaDisplay = document.getElementById('cola-display');
const btnAtender = document.getElementById('btn-atender');
const msgAtender = document.getElementById('msg-atender');

// Inicialización de la UI
colaDisplay.innerText = `En espera: ${JSON.stringify(cola)}`;

// Evento para atender al primer cliente de la cola
btnAtender.addEventListener('click', () => {
    if (cola.length > 0) {
        const result = atenderCliente(cola);
        cola = result.newArr;
        colaDisplay.innerText = `En espera: ${JSON.stringify(cola)}`;
        msgAtender.innerText = `Atendiendo a: ${result.cliente}`;
        
        // Desactivar si la cola está vacía
        if (cola.length === 0) {
            btnAtender.disabled = true;
            btnAtender.innerText = 'Cola vacía';
        }
    }
});
