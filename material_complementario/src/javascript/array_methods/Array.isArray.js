/*
    El método Array.isArray() determina si el valor pasado es un
    Array.
    Fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*/

const numeros = [10, 20, 30];
const letras = ["a", "b", "c"];
const saludo = "Hola";
const numero = 500;
const booleano = true;
const objeto = { a: 1, b: 2 };

console.log("\nEJEMPLO: Uso de Array.isArray para comprobar si es un array");
console.log(Array.isArray(numeros));    // Imprime true
console.log(Array.isArray(letras));     // Imprime true
console.log(Array.isArray(saludo));     // Imprime false
console.log(Array.isArray(numero));     // Imprime false
console.log(Array.isArray(booleano));   // Imprime false
console.log(Array.isArray(objeto));     // Imprime false
