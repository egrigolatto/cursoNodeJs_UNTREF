/*
    El fs módulo proporciona una API para interactuar con el sistema
    de archivos de una manera estrechamente modelada en torno a las
    funciones POSIX estándar.

    La fs.promisesAPI proporciona un conjunto alternativo de métodos
    de sistema de archivos asincrónicos que devuelven Promiseobjetos
    en lugar de utilizar devoluciones de llamada.
    fuente: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html
*/

import fs from 'fs';

const rutaDelArchivoTXT = "./archivoDeLaActividadEnClase2.txt";

const escribirArchivo = async () => {
    await fs.promises.writeFile(rutaDelArchivoTXT, "Hola Mundo");
};

const leerArchivo = async () => {
    const contenido = await fs.promises.readFile(rutaDelArchivoTXT, "utf8");
    console.log(`\n${contenido}`);
};

const agregarDatosAlArchivo = async () => {
    await fs.promises.appendFile(rutaDelArchivoTXT, "\nBienvenidos");
};

const modificarArchivo = async () => {
    const contenido = await fs.promises.readFile(rutaDelArchivoTXT, "utf8");
    let contenidoModificado = contenido.replace("Mundo", "Comisión");

    await fs.promises.writeFile(rutaDelArchivoTXT, contenidoModificado);
};

const eliminmarArchivo = async () => {
    await fs.promises.unlink(rutaDelArchivoTXT);
};

const probar = async () => {
    await escribirArchivo();
    await leerArchivo();

    await agregarDatosAlArchivo();
    await leerArchivo();

    await modificarArchivo();
    await leerArchivo();

    await eliminmarArchivo();
};

probar();