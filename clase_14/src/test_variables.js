const numeroAleatorio = Math.random();
console.log(numeroAleatorio); // Imprime un número como 0.7679801603050971

const numeroAleatorioEntero = parseInt(Math.random() * 1000000);
console.log(numeroAleatorioEntero); // Imprime un número como 726323

const crypto = require('crypto');
const identificadorUnicoUniversal = crypto.randomUUID();
console.log(identificadorUnicoUniversal); // Imprime un valor como e9a773c5-3f21-4b66-891b-dbfe0823080d

const uuIdFormateado = identificadorUnicoUniversal.replaceAll('-', '');
console.log(uuIdFormateado); // Imprime un valor como e9a773c53f214b66891bdbfe0823080d

const uuIdFormateadoRecortado = uuIdFormateado.slice(0, 24);
console.log(uuIdFormateadoRecortado); // Imprime un valor como e9a773c53f214b66891bdbfe