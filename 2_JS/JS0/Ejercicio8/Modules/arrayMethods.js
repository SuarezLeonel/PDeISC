// Ejercicio 8: .includes()

export const esAdmin = (arr) => {
    return arr.includes('admin');
};

export const existeVerde = (arr) => {
    return arr.includes('verde');
};

export const agregarSiNoExiste = (arr, num) => {
    if (!arr.includes(num)) {
        arr.push(num);
        return { success: true, newArr: [...arr] };
    }
    return { success: false, newArr: [...arr] };
};
