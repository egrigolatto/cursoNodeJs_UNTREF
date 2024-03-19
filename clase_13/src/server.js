const express = require('express');
const { connectToCollection, desconnect, generateId } = require('../mongodb.js');

const server = express();

const messageNotFound = JSON.stringify({ message: 'El id no pertenece a un coche exixtente' });
const messageMissingData = JSON.stringify({ message: 'Faltan datos' });
const messageErrorServer = JSON.stringify({ message: 'Se produjo un error en el server' });

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/coches', async (req, res) => {
    const { marca, precio, precio_mayor_que } = req.query;
    let coches = [];

    try {
        const collection = await connectToCollection('coches');

        if (marca) coches = await collection.find({ marca }).toArray();
        else if (precio === 'min') coches = await collection.find().sort({ precio: 1 }).limit(1).toArray();
        else if (precio === 'max') coches = await collection.find().sort({ precio: -1 }).limit(1).toArray();
        else if (precio_mayor_que) coches = await collection.find({ precio: { $gt: Number(precio_mayor_que) } }).toArray();
        else coches = await collection.find().toArray();

        res.status(200).send(JSON.stringify({ payload: coches }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.get('/coches/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await connectToCollection('coches');
        const coche = await collection.findOne({ id: { $eq: Number(id) } });

        if (!coche) return res.status(400).send(messageNotFound);

        res.status(200).send(JSON.stringify({ payload: coche }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.post('/coches', async (req, res) => {
    const { marca, modelo, anio, precio, descuento, es_0km, velocidad_crucero } = req.body;

    if (!marca && !modelo && !anio && !precio) return res.status(400).send(messageMissingData);

    try {
        const collection = await connectToCollection('coches');
        const coche = { id: await generateId(collection), marca, modelo, anio, precio };

        if (descuento) coche.descuento = descuento;
        if (es_0km) coche.es_0km = es_0km;
        if (velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;

        await collection.insertOne(coche);
        res.status(201).send(JSON.stringify({ message: 'Coche registrado', payload: coche }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.put('/coches/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, anio, precio, descuento, es_0km, velocidad_crucero } = req.body;

    if (!marca && !modelo && !anio && !precio) return res.status(400).send(messageMissingData);

    try {
        const collection = await connectToCollection('coches');
        let coche = await collection.findOne({ id: { $eq: Number(id) } });

        if (!coche) return res.status(400).send(messageNotFound);
        coche = { marca, modelo, anio, precio };

        if (descuento) coche.descuento = descuento;
        if (es_0km) coche.es_0km = es_0km;
        if (velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;

        await collection.updateOne({ id: Number(id) }, { $set: coche });
        res.status(200).send(JSON.stringify({ message: 'Coche actualizado', payload: { id, ...coche } }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

server.delete('/coches/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await connectToCollection('coches');
        const coche = await collection.findOne({ id: { $eq: Number(id) } });

        if (!coche) return res.status(400).send(messageNotFound);

        await collection.deleteOne({ id: { $eq: Number(id) } });
        res.status(200).send(JSON.stringify({ message: 'Coche eliminado' }));
    } catch (error) {
        console.log(error.message);
        res.status(500).send(messageErrorServer);
    } finally {
        await desconnect();
    }
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/coches`);
});