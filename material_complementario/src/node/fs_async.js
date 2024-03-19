/*
    El fs módulo proporciona una API para interactuar con el sistema
    de archivos de una manera estrechamente modelada en torno a las
    funciones POSIX estándar.
    fuente: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html

    POSIX (acrónimo de Portable Operating System Interface y X por
    UNIX como seña de identidad de la API) es una norma escrita por
    la IEEE, que define una interfaz estándar del sistema operativo
    y el entorno, incluyendo un intérprete de comandos.
*/

import fs from 'fs';

const rutaDelArchivoTXT = "./archivoFsAsync.txt";

fs.writeFile(rutaDelArchivoTXT, "Hola Mundo", (error) => {
    if (error) {
        return "Error al escribir el archivo.";
    }
});

fs.readFile(rutaDelArchivoTXT, "utf8", (error, result) => {
    if (error) {
        return "Error al leer el archivo.";
    }

    console.log(result);
});

fs.appendFile(rutaDelArchivoTXT, "\nBienvenidos", (error) => {
    if (error) {
        return "Error al actualizar el archivo.";
    }
});

// Descomentar para probar
fs.unlink(rutaDelArchivoTXT, (error) => {
    if (error) {
        return "Error al eliminar el archivo.";
    }
});