const numeroAleatorio = Math.random();
console.log(numeroAleatorio);

const numeroAleatorioEntero = parseInt(numeroAleatorio*1000000);
console.log(numeroAleatorioEntero);

//crypto, biblioteca de node

const crypto = require('crypto');
const uuId = crypto.randomUUID();
const uuIdFormateado = uuId.replaceAll('-','');
// const uuIdFormateado = uuId.replaceAll('-','').slice(0, 10); si lo quisiera recortar
console.log(uuIdFormateado);

//base64url-- quita ciertos caracteres como las barras //

//instalar jsonwebtoken -- npm i jsonwebtoken