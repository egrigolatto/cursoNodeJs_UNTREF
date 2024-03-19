const Router = require("express");

const routes = Router();

routes
    .get('/coche1', (req, res) => {
        // Ruta: http://127.0.0.1:3000/coches/coche1
        res.status(200).send("Ruta de coche 1");
    })
    .get('/coche2', (req, res) => {
        // Ruta: http://127.0.0.1:3000/coches/coche2
        res.status(200).send("Ruta de coche 2");
    });

module.exports = routes;