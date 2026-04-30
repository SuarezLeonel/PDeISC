// Ejercicio 3: .unshift()

// Agrega colores al inicio del array
export const agregarColores = (arr, c1, c2, c3) => {
    arr.unshift(c1, c2, c3);
    return [...arr];
};

// Agrega una tarea urgente al inicio del array
export const agregarTareaUrgente = (arr, tarea) => {
    arr.unshift(tarea);
    return [...arr];
};

// Agrega un usuario al inicio de la lista de conectados
export const agregarUsuarioConectado = (arr, user) => {
    arr.unshift(user);
    return [...arr];
};
