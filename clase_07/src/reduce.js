// Uso de reduce
const numeros = [1, 2, 8, 4, 5, 15];
const valorInicial = 100;
const sumatoria = numeros.reduce((acumulador, valor) => acumulador + valor, valorInicial);
console.log(sumatoria);