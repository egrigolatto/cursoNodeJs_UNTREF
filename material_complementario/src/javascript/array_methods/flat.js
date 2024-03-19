/*
    El método flat() crea una nueva matriz con todos los elementos
    de sub-array concatenados recursivamente hasta la profundidad
    especificada.
    Fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
*/

const arreglo = [10, 20, ["a", "b", "c"], 30, [[100, 200], [500]]];

console.log("\nEJEMPLO N°1: Uso de flat de primer nivel");
let arregloAplanadoPrimerNivel = arreglo.flat();
// Imprime [ 10, 20, 'a', 'b', 'c', 30, [ 100, 200 ], [ 500 ] ]
console.log(arregloAplanadoPrimerNivel);

console.log("\nEJEMPLO N°2: Uso de flat de segundo nivel");
let arregloAplanadoSegundoNivel = arreglo.flat(2);
// Imprime [ 10, 20, 'a', 'b', 'c', 30, 100, 200, 500 ]
console.log(arregloAplanadoSegundoNivel);