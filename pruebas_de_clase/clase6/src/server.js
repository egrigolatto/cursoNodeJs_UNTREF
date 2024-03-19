const express = require("express");
const path = require("path");

const server = express();
const HOST = "127.0.0.1";
const PORT = 3000;

const coches = [

    { id: 1, marca: "Ford", anio: 2020, color: "rojo" },
    { id: 2, marca: "Fiat", anio: 2000, color: "blanco" },
    { id: 3, marca: "Chevrolet", anio: 2020, color: "negro" },
    { id: 4, marca: "Citroen", anio: 2020, color: "salmon" },
];

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

//URL params
server.get("/coches/:id/anio/:anio", (req, res) => {
    const { id, anio } = req.params;

    const coche = coches.find((elemento) => elemento.id === Number(id));
    if (coche) {
        coche.anio = anio;
    }

    if (!coche) {
        res.status(200).render("coches", { coches });
    }
    res.status(200).render("coche", { coche });
});

//query params
server.get("/coches", (req, res) => {
    const { id, anio, color  } = req.query;

    const coche = coches.find((elemento) => elemento.id === Number(id));
    coche.anio = anio;

    if (!coche) {
        res.status(400).send("Id incorrecto");
    }
    res.status(200).send(coche);
});

server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><br><p>No se encontro el recurso buscado</p>");
});

server.listen(PORT, HOST, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});