// Ejercicio 3: .unshift()

export const agregarColores = (arr, c1, c2, c3) => {
    arr.unshift(c1, c2, c3);
    return [...arr];
};

export const agregarTareaUrgente = (arr, tarea) => {
    arr.unshift(`[URGENTE] ${tarea}`);
    return [...arr];
};

export const agregarUsuarioConectado = (arr, user) => {
    arr.unshift(user);
    return [...arr];
};
