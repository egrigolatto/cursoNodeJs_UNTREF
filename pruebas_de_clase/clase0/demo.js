// console.log("hola");

// console.table([5,511,5,52,552,55,5,756])

let  dividendo = 10;
let  divisor = 2;

try {
    if (divisor !== 0) {
        console.log(dividendo / divisor);
    } else {
        throw new Error("No se puede dividir por cero")
    }
} catch (error) {
    console.log(error.message);
} finally {
    let resultado = 3*8;
    console.log("siempre me voy a ejecutar");
}
