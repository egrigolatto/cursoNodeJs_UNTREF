const express = require('express');
const path = require('path');

const server = express();
const PORT = 3000;
const HOST = '127.0.0.1';

// En este método si importa el lugar en el que se ha declarado.
// Se debe colocar arriba de todas las rutas. Lo podes probar en
// tu navegador: http://localhost:3000/img/argentina_programa_4.png
server.use('/public', express.static(path.join(__dirname, 'public')));

// Configuración de la ruta base http://127.0.0.1:3000/
server.get('/', (request, response) => {
    response.status(200).send('Hola Mundo');
});

// Configuración de la ruta materia http://127.0.0.1:3000/materia
server.get('/materia', (request, response) => {
    response.status(200).send('Bienvenidos a Programación Backend');
});

// Control de rutas inexistentes: En este método si importa el lugar
// en el que se ha declarado. Se debe colocar abajo de todas las rutas.
server.use('*', (request, response) => {
    response.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de solicitudes
server.listen(PORT, HOST, () => console.log(`Ejecutandose en http://${HOST}:${PORT}`));