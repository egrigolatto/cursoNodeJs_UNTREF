const express = require('express');
const { findOneById, findAll, create, update, destroy } = require('./database/data.manager.js');

require('dotenv').config();

const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Obtener todos los coches: Ruta GET http://127.0.0.1:3000/coches
server.get('/coches', (req, res) => {
    findAll()
        .then((coches) => res.status(200).send(coches))
        .catch((error) => res.status(400).send(error.message));
});

// Obtener un coche específico: Ruta GET http://127.0.0.1:3000/coches/1
server.get('/coches/:id', (req, res) => {
    const { id } = req.params;

    findOneById(Number(id))
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message));
});

// Crear un nuevo coche: Ruta POST http://127.0.0.1:3000/coches
server.post('/coches', (req, res) => {
    const { marca, color, anio } = req.body;

    create({ marca, color, anio })
        .then((coches) => res.status(201).send(coches))
        .catch((error) => res.status(400).send(error.message));
});

// Actualizar un coche específico: Ruta PUT http://127.0.0.1:3000/coches/1
server.put('/coches/:id', (req, res) => {
    const { id } = req.params;
    const { marca, color, anio } = req.body;

    update({ id: Number(id), marca, color, anio })
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message));
});

// Eliminar un coche específico: Ruta DELETE http://127.0.0.1:3000/coches/1
server.delete('/coches/:id', (req, res) => {
    const { id } = req.params;

    destroy(Number(id))
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message));
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/coches`);
});