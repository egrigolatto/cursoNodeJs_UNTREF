const { connectToDB, disconnectFromMongoDB } = require('./mongodb.js');

const DATABASE_NAME = 'prueba';

async function getCoches() {
    const client = await connectToDB();
    const db = client.db(DATABASE_NAME);
    const coches = await db.collection('coches').find().toArray();

    await disconnectFromMongoDB();
    console.log('\nEJEMPLO: Mostrar todos los coches');
    console.log(coches);
}

async function getCoche() {
    const client = await connectToDB();
    const db = client.db(DATABASE_NAME);
    const coche = await db.collection('coches').findOne({ id: 2 });

    await disconnectFromMongoDB();
    console.log('\nEJEMPLO: Mostrar un coche');
    console.log(coche);
}

async function test() {
    await getCoches();
    await getCoche();
}

test();
