const express = require('express');
const fs = require('fs');
const path = require('path');

const server = express();
const PORT = 3000;
const HOST = '127.0.0.1';

const rutaDelArchivo = path.join(__dirname, 'data.json');

function escribirContenidoEnArchivo(contenido) {
    if (!contenido) {
        throw new Error('Error. No se ha enviado un contenido definido');
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(rutaDelArchivo, contenido, 'utf8', (error) => {
            if (error) {
                reject(new Error('Error al escribir contenido en el archivo'));
            }

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

            resolve(result);
        });
    });
}

// Configuración de la ruta archivo http://127.0.0.1:3000/archivo?saludo=Hola%20Mundo%20desde%20el%20navegador
server.get('/archivo', (req, res) => {
    // Pamámetro recibido por query
    const { saludo } = req.query;

    async function procesar(contenido) {
        try {
            await escribirContenidoEnArchivo(contenido);
            const contenidoLeido = await leerContenidoDeArchivo();

            res.status(200).send(contenidoLeido);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    procesar(saludo);
});

// Control de rutas inexistentes
server.use('*', (request, response) => {
    response.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(PORT, HOST, () => console.log(`Ejecutandose en http://${HOST}:${PORT}`));