// Ejercicio 1: .push()

// Agrega una fruta al final del array
export const agregarFruta = (arr, fruta) => {
    arr.push(fruta);
    return [...arr];
};

// Agrega tres amigos al final del array
export const agregarAmigos = (arr, a1, a2, a3) => {
    arr.push(a1, a2, a3);
    return [...arr];
};

// Agrega un número si es mayor al último elemento
export const agregarSiEsMayor = (arr, num) => {
    const ultimo = arr[arr.length - 1];
    if (arr.length === 0 || num > ultimo) {
        arr.push(num);
        return { success: true, newArr: [...arr] };
    }
    return { success: false, newArr: [...arr] };
};
