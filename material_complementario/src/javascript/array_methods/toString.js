/*
    El método toString() devuelve una cadena de caracteres
    representando el array especificado y sus elementos.
    Fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/toString
*/

const arreglo = [10, 20, ["a", "b", "c"]];

console.log("\nEJEMPLO: Uso de toString");
let texto = arreglo.toString();
console.log(texto); // Imprime 10,20,a,b,c
