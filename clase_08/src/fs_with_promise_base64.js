/*
    Los métodos del módulo fs se ejecutan por defecto de forma asíncrona
    (async). Sin embargo, la mayoría de los métodos cuentan con una version
    síncrona. Ejemplo: readFile() (async) Vs readFileSync() (sync).

    Es una buena práctica usar los métodos asíncronos para evitar el bloqueo
    del bucle de eventos y por lo tanto la aplicación.
*/

const fs = require('fs');
const path = require('path');

const rutaDelArchivo = path.join(__dirname, 'archivo.txt');

function escribirContenidoEnArchivo(contenido) {
    const contenidoCifrado = Buffer.from(contenido, 'utf8').toString('base64');

    return new Promise((resolve, reject) => {
        fs.writeFile(rutaDelArchivo, contenidoCifrado, 'utf8', (error) => {
            if (error) {
                reject(new Error('Error al escribir contenido en el archivo'));
            }

            console.log('\nContenido escrito');
            resolve(true);
        });
    });
}

function leerContenidoDeArchivo() {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaDelArchivo, 'utf8', (error, result) => {
            if (error) {
                reject(new Error('Error al leer el archivo'));
            }

            console.log('Contenido leido');
            const contenidoDecifrado = Buffer.from(result, 'base64').toString('utf8');
            resolve(contenidoDecifrado);
        });
    });
}

function agregarContenidoEnArchivo(contenidoExistente, contenidoAgregado) {
    const contenidoCifrado = Buffer.from(contenidoExistente + contenidoAgregado, 'utf8').toString('base64');

    return new Promise((resolve, reject) => {
        // Los cifrados en base64 siempre terminan con los símbolos == y esto
        // complica el uso de fs.appendFile ya que quedan entre medio dichos
        // símbolos. Por tal motivo, se usa fs.writeFile para sobrescribir el
        // contenido por completo.
        fs.writeFile(rutaDelArchivo, contenidoCifrado, 'utf8', (error) => {
            if (error) {
                reject(new Error('Error al agregar contenido en el archivo'));
            }

            console.log('\nContenido agregado');
            resolve(true);
        });
    });
}

function eliminarArchivo() {
    return new Promise((resolve, reject) => {
        fs.unlink(rutaDelArchivo, (error) => {
            if (error) {
                reject(new Error('Error al eliminar el archivo'));
            }

            console.log('\nArchivo eliminado');
            resolve(true);
        });
    });
}

async function probarFS() {
    try {
        await escribirContenidoEnArchivo('Hola Mundo');
        const resultadoLeido1 = await leerContenidoDeArchivo();
        console.log(resultadoLeido1);

        await agregarContenidoEnArchivo(resultadoLeido1, '\nBienvenidos a Programación BackEnd');
        const resultadoLeido2 = await leerContenidoDeArchivo();
        console.log(resultadoLeido2);

        await eliminarArchivo();
    } catch (error) {
        console.log(error.message);
    }
}

probarFS();