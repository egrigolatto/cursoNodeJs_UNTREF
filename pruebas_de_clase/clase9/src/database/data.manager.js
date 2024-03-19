const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data.json");

function escribir(contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(ruta, JSON.stringify(contenido, null, "\t"), "utf8", (error) => {
            if (error) reject(new Error("Error. No se pudo escribir"));

            resolve(true);
        });

    });
}

function leer() {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (error, result) => {
            if (error) reject(new Error("Error. No se pudo leer"));

            resolve(JSON.parse(result));
        });
    });
}

function generarId(coches) {
    let mayorId = 0;

    coches.forEach((coche) => {
        if (Number(coche.id) > mayorId) {
            mayorId = Number(coche.id);
        }
    });

    return mayorId + 1;
}

async function findOneById(id) {
    if (!id) throw new Error("Error. Id indefinido");

    const coches = await leer();
    const coche = coches.find((element) => element.id === id);

    if (!coche) throw new Error("Error. Id no corresponde a un coche");

    return coche;
}

async function findAll() {
    const coches = await leer();
    return coches;
}

async function create(coche) {
    if (!coche?.marca || !coche?.color) throw new Error("Error. Datos incompletos");

    const coches = await leer();
    const cocheConId = { id: generarId(coches), ...coche };

    coches.push(cocheConId);

    await escribir(coches);

    return cocheConId;
}

async function update(coche) {
    if (!coche.id || !coche.marca || !coche.color) throw new Error("Error. Datos incompletos");

    const coches = await leer();
    const indice = coches.findIndex((element) => element.id === coche.id);

    if (!indice) throw new Error("Error. Id no corresponde a un coche");

    coches[indice] = coche;
    await escribir(coches);

    return coche;
}

async function destroy(id) {
    if (!id) throw new Error("Error. Id indefinido");

    const coches = await leer();
    const coche = coches.find((element) => element.id === id);
    const indice = coches.findIndex((element) => element.id === id);

    if (!indice) throw new Error("Error. Id no corresponde a un coche");

    coches.splice(indice, 1);

    await escribir(coches);

    return coche;
}

module.exports = { findAll, findOneById, create, update, destroy };