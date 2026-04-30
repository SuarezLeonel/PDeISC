// Ejercicio 4: .shift()

// Elimina el primer elemento del array de enteros
export const eliminarPrimerEntero = (arr) => {
    arr.shift();
    return [...arr];
};

// Elimina el primer mensaje del chat y retorna el mensaje eliminado y el nuevo array
export const eliminarPrimerMensaje = (arr) => {
    const eliminado = arr.shift();
    return { eliminado, newArr: [...arr] };
};

// Atiende al primer cliente de la cola (elimina el primero)
export const atenderCliente = (arr) => {
    const cliente = arr.shift();
    return { cliente, newArr: [...arr] };
};
