const frutas = ['Manzana', 'Naranja', 'Banana', 'Uva', 'Ananá'];

// Uso de sort con texto ascendente (valor unicode)
frutas.sort((a, b) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
});
console.log(frutas);

// Uso de sort con texto descendente (valor unicode)
frutas.sort((a, b) => {
    if (b > a) return 1;
    else if (b < a) return -1;
    return 0;
});
console.log(frutas);

const numeros = [11, 15, 8, 9, 24];

// Uso de sort con números de menor a mayor
numeros.sort((a, b) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
});
console.log(numeros);

// Uso de sort con números de mayor a menor
numeros.sort((a, b) => {
    if (b > a) return 1;
    else if (b < a) return -1;
    return 0;
});
console.log(numeros);
