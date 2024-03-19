const express = require("express");
const data = require("./data.js");

const server = express();
const PORT = 3000;
const HOST = "127.0.0.1"; // Thunder Client no funciona con "localhost"
const coches = data.obtenerCoches();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Método Get: retorna todos los coches
server.get('/coches', (req, res) => {
    res.status(200).send(coches);
});

// Método Get: retorna un coche según el id
server.get('/coches/:id', (req, res) => {
    const { id } = req.params;
    const coche = coches.find((elemento) => elemento.id === Number(id));

    if (!coche) {
        res.status(400).send("Coche no encontrado");
    }

    res.status(200).send(coche);
});

// Método Post: agrega un nuevo coche
server.post('/coches', (req, res) => {
    const cocheNuevo = req.body;

    if (!cocheNuevo.marca || !cocheNuevo.modelo || !cocheNuevo.anio) {
        res.status(400).send("Datos incompletos");
    }

    coches.push({ id: data.generarNuevoId(coches), ...cocheNuevo });
    console.log(coches);
    res.status(201).send("El coche se ha creado correctamente");
});

// Método Put: modifica un coche según el id
server.put('/coches/:id', (req, res) => {
    const { id } = req.params;
    const cocheModificado = req.body;
    const coche = coches.find((elemento) => elemento.id === Number(id));

    if (!coche || !cocheModificado.marca || !cocheModificado.modelo || !cocheModificado.anio) {
        return res.status(400).send("Coche no encontrado o datos incompletos");
    }

    coche.marca = cocheModificado.marca;
    coche.modelo = cocheModificado.modelo;
    coche.anio = cocheModificado.anio;
    return res.status(200).send("El coche se ha modificado correctamente");
});

// Método Delete: elimina un coche según el id
server.delete('/coches/:id', (req, res) => {
    const { id } = req.params;
    const index = coches.findIndex((elemento) => elemento.id === Number(id));

    if (index < 0) {
        return res.status(400).send("Coche no encontrado");
    }

    coches.splice(index, 1);
    return res.status(200).send("El coche se ha eliminado correctamente");
});

// Control de rutas inexistentes
server.use('*', (request, response) => {
    response.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(PORT, HOST, () => console.log(`Ejecutandose en http://${HOST}:${PORT}`));