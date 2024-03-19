const express = require("express");
const path = require("path");
const data = require("./data.js");

const server = express();
const PORT = 3000;
const HOST = "127.0.0.1";
const coches = data.obtenerCoches();

// Servir un recurso de forma estática
server.use('/public', express.static(path.join(__dirname, 'public')));

// Configuración del motor de plantillas
server.set('view engine', 'ejs');
server.set("views", path.join(__dirname, "views/pages/"));

// Configuración de la ruta example_if http://127.0.0.1:3000/example_if
server.get('/example_if', (request, response) => {
    let coche = coches[0];
    response.status(200).render("example_if", { coche });
});

// Configuración de la ruta example_for http://127.0.0.1:3000/example_for
server.get('/example_for', (request, response) => {
    response.status(200).render("example_for", { coches });
});

// Configuración de la ruta example_foreach http://127.0.0.1:3000/example_foreach
server.get('/example_foreach', (request, response) => {
    response.status(200).render("example_foreach", { coches });
});

// Configuración de la ruta example_include http://127.0.0.1:3000/example_include
server.get('/example_include', (request, response) => {
    let coche = coches[0];
    response.status(200).render("example_include", { coche });
});

// Configuración de la ruta example_img http://127.0.0.1:3000/example_img
server.get('/example_img', (request, response) => {
    response.status(200).render("example_img");
});

// Control de rutas inexistentes
server.use('*', (request, response) => {
    response.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(PORT, HOST, () => console.log(`Ejecutandose en http://${HOST}:${PORT}`));