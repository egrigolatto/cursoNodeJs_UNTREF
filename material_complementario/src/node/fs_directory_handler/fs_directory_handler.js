const fs = require("fs");
const path = require("path");

// Crea un nuevo directorio
fs.mkdir(path.join(__dirname, 'directorio1'), (error) => {
    if (error) {
        return console.log('Hubo un error. El directorio no se ha creado');
    }

    console.log('El directorio se ha creado correctamente');
});

// Renombra un directorio
fs.rename(path.join(__dirname, 'directorio1'), path.join(__dirname, 'directorio2'), (error) => {
    if (error) {
        return console.log('Hubo un error. El directorio no se ha renombrado');
    }

    console.log('El directorio se ha renombrado correctamente');
});

// Lee los nombres de los archivos de un directorio
fs.readdir(path.join(__dirname, 'archivos'), (error, nombres) => {
    if (error) {
        return console.log('Hubo un error. No se ha logrado leer los nombres de los archivos');
    }

    console.log('Se ha logrado leer los nombres de los archivos correctamente');
    console.log(nombres); // nombres de archivos

    fs.readFile(path.join(__dirname, "archivos", nombres[0]), "utf8", (err, contenido) => {
        if (err) {
            return console.log(`Hubo un error. No se ha logrado leer el contenido del archivo ${nombres[0]}`);
        }

        console.log(`Se ha logrado leer el contenido del archivo ${nombres[0]}`);
        console.log(contenido);
    });
});

// Elimina un directorio
fs.rmdir(path.join(__dirname, 'directorio1'), (error) => {
    if (error) {
        return console.log('Hubo un error. El directorio no se ha eliminado');
    }

    console.log('El directorio se ha eliminado correctamente');
});