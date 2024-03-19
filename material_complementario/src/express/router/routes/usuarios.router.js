const Router = require("express");

const routes = Router();

routes
    .get('/usuario1', (req, res) => {
        // Ruta: http://127.0.0.1:3000/usuarios/usuario1
        res.status(200).send("Ruta de usuario 1");
    })
    .get('/usuario2', (req, res) => {
        // Ruta: http://127.0.0.1:3000/usuarios/usuario2
        res.status(200).send("Ruta de usuario 2");
    });

module.exports = routes;