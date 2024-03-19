const express = require('express');
const { generateToken, verifyToken, checkRole } = require('./security.js');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Data example
const user = {
    id: 135000855,
    name: 'Juan',
    surname: 'Pérez',
    username: 'Juancito',
    password: '123456',
    isAdmin: true
};

// Ruta para obtener un token
server.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        return res.status(200).send({ token: generateToken(user.username, user.isAdmin) });
    }

    return res.status(400).send('El nombre de usuario y/o contraseña son incorrectas.');
});

// Ruta protegida que exige un token válido
server.get('/recurso', verifyToken, (req, res) => {
    console.log(req.username);

    res.status(200).send('Este es un recurso protegido');
});

// Ruta protegida que exige un token válido y un rol de administrador
server.get('/admin/recurso', verifyToken, (req, res, next) => {
    checkRole(req, res, next);

    res.status(200).send('Este es un recurso protegido que tiene acceso exclusivo para administradores');
});

// Método oyente de solicitudes
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});