/*
    ¿Qué es Base64?
    Es un algoritmo de codificación que permite transformar cualquier
    carácter de cualquier idioma en un alfabeto que consta de letras,
    dígitos y signos latinos. Con esto podemos convertir caracteres
    especiales como logogramas chinos, emojis e incluso imágenes en una
    secuencia "legible" (para cualquier ordenador), que se puede guardar
    y/o transferir en cualquier otro lugar. A menudo se utiliza para
    transmitir datos binarios por medio de transmisiones que tratan sólo
    con texto, como para enviar imágenes y archivos adjuntos por correo
    electrónico.
    Su alfabeto consta de 64 caracteres (,,, [A-Z][a-z]"[0-9]/" y "+"),
    que dieron lugar a su nombre.

    ¿Es seguro Base64?
    El algoritmo de codificación Base64 no es un algoritmo de cifrado,
    se decodifica fácilmente y, por lo tanto, no debe utilizarse como
    un método de cifrado seguro. No utilice esta técnica para proteger
    los datos confidenciales.

    ¿Base64 reduce el tamaño de mis archivos?
    No, por el contrario, utilizando este algoritmo de codificación
    Base64, el tamaño del archivo aumenta en un 33%, ya que reemplaza
    cada 3 bytes por 4 bytes.
    Fuente: https://marquesfernandes.com/es/tecnologia-es/que-y-base64-para-que-serve-y-como-funciona/

    En JavaScript hay dos funciones para base64. Una para codificar y
    otra para decodificar.
    El método atob() decodifica una cadena de datos que ha sido codificada
    usando la codificación base 64. Por el contrario, el método btoa()
    crea una cadena ASCII codificada en base 64 a partir de una "cadena"
    de datos binarios.
    Fuente: https://developer.mozilla.org/es/docs/Glossary/Base64
*/

const saludo = 'Hola Mundo';

console.log("\nEJEMPLO 1: Uso de btoa para codificar en base64");
const saludoCodificado = btoa(saludo);              // Imprime SG9sYSBNdW5kbw==
console.log(saludoCodificado);

console.log("\nEJEMPLO 2: Uso de atob para decodificar en base64");
const saludoDecodificado = atob(saludoCodificado);  // Imprime Hola Mundo
console.log(saludoDecodificado);

/*
    Asimismo, se puede codificar y decodificar en base64 por medio de
    un casting utilizando el método from() de la clase global Buffer
    en Node.js.

    Buffer:
    Un búfer es un espacio de memoria en el que se almacenan datos de
    forma temporal mientras se están transfiriendo de un sitio a otro.
    Fuente: https://developer.mozilla.org/es/docs/Glossary/Buffer
*/

console.log("\nEJEMPLO 3: Uso de Buffer para codificar en base64");
const saludoCodificadoConBuffer = Buffer.from(saludo, "utf8").toString("base64");
console.log(saludoCodificadoConBuffer);     // Imprime SG9sYSBNdW5kbw==

console.log("\nEJEMPLO 4: Uso de Buffer para decodificar en base64");
const saludoDecodificadoConBuffer = Buffer.from(saludoCodificadoConBuffer, "base64").toString("utf8");
console.log(saludoDecodificadoConBuffer);   // Imprime Hola Mundo
