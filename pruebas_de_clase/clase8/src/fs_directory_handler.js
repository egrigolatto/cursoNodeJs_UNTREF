const fs = require("fs");
const path = require("path");

//crear un diectorio
// fs.mkdir(path.join(__dirname, "archivos"), (error) => {
//     if (error)  throw new Error("houbo un error al crear el directorio");
//     console.log("El directorio se ha creado correctamente");
// });

// setTimeout(() => {
//     //renombrar un directroio
//     fs.rename(path.join(__dirname, "archivos"), path.join(__dirname, "archivos2"), (error) => {
//         if (error) throw new Error("houbo un error al renombrar el directorio");
//         console.log("El directorio se ha renombrado correctamente");
//     });
// }, 250);

// setTimeout(() => {
// //eliminar un dirctorio
//     fs.rmdir(path.join(__dirname, "archivos2"), (error) => {
//         if (error) throw new Error("houbo un error al eliminar el directorio");
//         console.log("El directorio se ha eliminado correctamente");
//     });
// }, 550);

// setTimeout(() => {
//     //leer un dirctorio
//     fs.readdir(path.join(__dirname, "otros"), (error, result) => {
//         if (error) throw new Error("houbo un error al leer el directorio");
//         console.log("El directorio se ha leido correctamente");
//         console.log(result);

//         fs.readFile(path.join(__dirname, `otros/${result[0]}`), "utf8", (err, contenido) => {
//             if (err) throw new Error("hubo un error al leer el directorio");

//             console.log("El archivo se ha leido correctamente");
//             console.log(contenido);
//         });
//     });
// }, 750);

const texto = "hola mundo todo bien";
//funciones nativas de js
// const codificado = btoa(texto);
// const decodificado = atob(codificado);

const codificado = Buffer.from(texto, "utf8").toString("base64");
const decodificado = Buffer.from(codificado, "base64").toString("utf8");

console.log(codificado);
console.log(decodificado);
