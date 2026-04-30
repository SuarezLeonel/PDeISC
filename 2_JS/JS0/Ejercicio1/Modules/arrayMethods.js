// Ejercicio 1: .push()

export const agregarFrutas = (arr, f1, f2, f3) => {
    arr.push(f1, f2, f3);
    return [...arr];
};

export const agregarAmigos = (arr, a1, a2, a3) => {
    arr.push(a1, a2, a3);
    return [...arr];
};

export const agregarSiEsMayor = (arr, num) => {
    const ultimo = arr[arr.length - 1];
    if (arr.length === 0 || num > ultimo) {
        arr.push(num);
        return { success: true, newArr: [...arr] };
    }
    return { success: false, newArr: [...arr] };
};
