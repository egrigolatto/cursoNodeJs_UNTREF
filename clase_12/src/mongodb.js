const { MongoClient } = require('mongodb');
const path = require('path');

// Se establece manualmente la ubicación del archivo .env
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const URL = process.env.DATABASE_URL;
const client = new MongoClient(URL);

async function connectToDB() {
    console.log('Conectando...');

    try {
        await client.connect();
        console.log('Se ha conectado a MongoDB');

        return client;
    } catch (error) {
        console.log('Error al conectar con MongoDB');
    }

    return null;
}

async function disconnectFromMongoDB() {
    try {
        await client.close();
        console.log('Se ha desconectado de MongoDB');
    } catch (error) {
        console.log('Error al desconectar de MongoDB');
    }
}

module.exports = { connectToDB, disconnectFromMongoDB };