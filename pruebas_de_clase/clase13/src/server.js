const express = require('express'); 
const { conectToDb, generateId, desconnect } = require('../mongodb.js'); 

//prueba para saber si esta funcionando la conexion
// async function test() {
//     await conectToDb('coches');
//     await desconnect();
// }
// test();

const server = express(); 

server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 

//para obtener todos los coches con filtros
server.get('/coches', async (req, res) => { 
    const { marca, modelo, precio_mayor_que } = req.query;
    
    let coches = [];
    const filtros = {};

    if (marca) filtros.marca = marca;
    if (modelo) filtros.modelo = modelo;
    if (precio_mayor_que) filtros.precio = { $gt: Number(precio_mayor_que ) };

    try {
        const collection = await conectToDb('coches');
        coches = (await collection.find(filtros).sort({ marca: 1 }).toArray()); 

        res.status(200).send(JSON.stringify(coches, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});
//obtener solo un coche, en este caso por id
server.get('/coches/:id', async (req, res) => { 
    const { id } = req.params; 

    try {
        const collection = await conectToDb('coches'); 
        const coche = await collection.findOne({ id: Number(id) }); 

        if (!coche) return res.status(400).send('Error. El Id no corresponde a un coche existente.');

        res.status(200).send(JSON.stringify(coche, null, '\t')); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

//metodo post para crear un nuevo coche
server.post('/coches', async (req, res) => {
    const { marca, modelo, anio, precio, descuento, es_0km, velocidad_crucero } = req.body;

    if (!marca || !modelo || !anio || !precio) {
        return res.status(400).send('Error. Faltan datos de relevancia.');
    }

    try {
        const collection = await conectToDb('coches');
        const coche = { id: await generateId(collection), marca, modelo, anio, precio };

        if (descuento) coche.descuento = descuento;
        if (es_0km) coche.es_0km = es_0km;
        if (velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;

        await collection.insertOne(coche);

        res.status(200).send(JSON.stringify(coche, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

//actualizar un articulo
server.put('/coches/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, anio, precio, descuento, es_0km, velocidad_crucero } = req.body;
    const coche = { marca, modelo, anio, precio };

    if (!id || !marca || !modelo || !anio || !precio) {
        return res.status(400).send('Error. Faltan datos de relevancia.');
    }

    if (descuento) coche.descuento = descuento;
    if (es_0km) coche.es_0km = es_0km;
    if (velocidad_crucero) coche.velocidad_crucero = velocidad_crucero;

    try {
        const collection = await conectToDb('coches');
        await collection.updateOne({ id: Number(id) }, { $set: coche});

        res.status(200).send(JSON.stringify(coche, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

server.delete('/coches/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await conectToDb('coches');
        await collection.deleteOne({ id: { $eq: Number(id) } });

        res.status(200).send(`el articulo fue eliminado`);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});


// Control de rutas inexistentes
server.use('*', (req, res) => {   
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de peteciones
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {  
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/coches`);
});