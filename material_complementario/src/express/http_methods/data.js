function obtenerCoches() {
    return [
        { id: 1, marca: "Ford", modelo: "Fiesta", anio: 2020 },
        { id: 2, marca: "Chevrolet", modelo: "S10", anio: 2013 },
        { id: 3, marca: "Fiat", modelo: "Palio", anio: 2022 },
        { id: 4, marca: "Fiat", modelo: "Punto", anio: 2019 },
        { id: 5, marca: "Chevrolet", modelo: "Cruze", anio: 2022 }
    ];
}

function generarNuevoId(coches) {
    let mayorId = 0;

    coches.forEach((coche) => {
        if (Number(coche.id) > mayorId) {
            mayorId = Number(coche.id);
        }
    });

    return mayorId + 1;
}

module.exports = { obtenerCoches, generarNuevoId };