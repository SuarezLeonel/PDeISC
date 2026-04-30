// Ejercicio 8: .includes()

// Verifica si existe el rol "admin" en el array
export const esAdmin = (arr) => {
    return arr.includes("admin");
};

// Verifica si existe el color "verde" en el array
export const existeVerde = (arr) => {
    return arr.includes("verde");
};

// Agrega un número al array solo si no existe previamente (evita duplicados)
export const agregarSiNoExiste = (arr, num) => {
    if (!arr.includes(num)) {
        arr.push(num);
        return { success: true, newArr: [...arr] };
    }
    return { success: false, newArr: [...arr] };
};
