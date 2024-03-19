const express = require("express");
const { findOneById, findAll,  create, update, destroy } = require("./database/data.manager.js");

require("dotenv").config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//obtener todos los coches
server.get('/coches', (req, res) => {
    findAll()
        .then((coches) => res.status(200).send(coches))
        .catch((error) => res.status(400).send(error.message));
});

//obtener un coche en especifico
server.get('/coches/:id', (req, res) => {
    const { id } = req.params;
    findOneById(Number(id))
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message));
});

//crear un nuevo coche
server.post('/coches', (req, res) => {
    const { marca, color } = req.body;

    create({ marca, color })
        .then((coche) => res.status(201).send(coche))
        .catch((error) => res.status(400).send(error.message));
});

//actualizar un coche eb especifico
server.put('/coches/:id', (req, res) => {
    const { id } = req.params;
    const { marca, color } = req.body;

    update({ id: Number(id), marca, color })
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message));

});

//eliminar un coche es especifico
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

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});