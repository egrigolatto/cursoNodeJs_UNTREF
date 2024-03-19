const saludo = 'Hola Mundo';

// Uso de Buffer para codificar en base64
const saludoCodificadoConBuffer = Buffer.from(saludo, 'utf8').toString('base64');
console.log(saludoCodificadoConBuffer);

// Uso de Buffer para decodificar en base64
const saludoDecodificadoConBuffer = Buffer.from(saludoCodificadoConBuffer, 'base64').toString('utf8');
console.log(saludoDecodificadoConBuffer);
