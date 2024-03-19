const fs = require("fs");
const path = require("path");

let primerContenido = "hola mundo desde un archivo txt";
let segundoContenido = "\nBuenas noches";

function escribirArchivo(contenido) {
   return new Promise((resolve, reject) => {
       fs.writeFile(path.join(__dirname, "demo.txt"), contenido, "utf8", (error) => {
           if (error) reject(new Error("hubo un error, no se ha podido escribir en el archivo"));

           console.log("El archivo se ha escrito correctamente");
           resolve(true)
       });
   });
}

function leerArchivo() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "demo.txt"), "utf8", (error, result) => {
        if (error) reject(new Error("hubo un error, no se ha podido leer el archivo"));

        console.log("El archivo fue leido correctamente");
        resolve(result);
        });
    });
}

function agregarAlArchivo(contenido) {
    return new Promise((resolve, reject) => {
        fs.appendFile(path.join(__dirname, "demo.txt"), "\nBuenas noches", "utf8", (error) => {
        if (error) reject(new Error("hubo un error, no se ha podido agregar en el archivo"));

        console.log("El contenido se ha escrito correctamenteEE");
        resolve(true);
        });
    });
}

function eliminarArchivo() {
    return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, "demo.txt"), (error) => {
        if (error) reject(new Error("hubo un error, no se ha podido eliminar el archivo"));

        console.log("El archivo se ha eliminado correctamente");
        resolve(true);
        }); 
    });
}

async function probar(params) {
    try {
    await escribirArchivo(primerContenido);
    let resultado1 = await leerArchivo();
    console.log(resultado1);
    console.log("\h fin");

    await agregarAlArchivo(segundoContenido);
    let resultado2 = await leerArchivo();
    console.log(resultado2);

    eliminarArchivo();
    } catch (error) {
    console.log(error.message);
    }
}
probar();



