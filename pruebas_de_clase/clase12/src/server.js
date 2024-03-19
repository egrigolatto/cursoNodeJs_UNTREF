const express = require("express");
const { connectToDB, disconnectFromMongoDB } = require("./mongodb.js");

const server = express();

const DATABASE_NAME = "prueba";

// Middleware: Establece el manejo de datos en formato JSON
server.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf8");
    next(); // Importante: Esto hace que la ejecución continue con el siguiente Middleware
});

// Obtener todos los coches: Ruta GET http://127.0.0.1:3000/coches
server.get('/coches', async (req, res) => {
    const client = await connectToDB();

    if (!client) return res.status(500).send("Error. No se pudo conectar con MongoDB.");

    const db     = client.db(DATABASE_NAME);
    const coches = await db.collection('coches').find().toArray();

    await disconnectFromMongoDB();
    res.status(200).send(JSON.stringify(coches, null, "\t"));
});

// Obtener un coche específico: Ruta GET http://127.0.0.1:3000/coches/1
server.get('/coches/:id', async (req, res) => {
    const { id } = req.params;
    const client = await connectToDB();

    if (!client) return res.status(500).send("Error al conectar con MongoDB");

    const db = client.db(DATABASE_NAME);
    const coche = await db.collection('coches').findOne({ id: { $eq: Number(id) } });

    if (!coche) return res.status(400).send("Error. El Id no corresponde a un coche existente.");

    await disconnectFromMongoDB();
    res.status(200).send(JSON.stringify(coche, null, "\t"));
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de peteciones
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/coches`);
});