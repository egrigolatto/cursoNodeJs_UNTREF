const express = require('express'); 
const server = express();
const path = require('path'); 
const { generateToken, verifyToken, checkRole } = require('./security.js')

require('dotenv').config({path: path.join(__dirname, '../.env')});

server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 

const user = {
    id: 135000855,
    name: 'Juan',
    surname: 'Pérez',
    username: 'Juancito',
    password: '123456',
    isAdmin: false
};

server.post('/login', (req, res) => { 
    const { username, password} = req.body;

    if (username === user.username && password === user.password) {
        return res.status(200).send({ token: generateToken(username, user.isAdmin) });
    }

    res.status(401).send('Credenciales invalidas');
});



server.get('/recurso', verifyToken, (req, res) => { 
    
    res.status(200).send('Este es un recurso protegido, ' + req.username);
});

server.get('/admin/recurso', verifyToken, (req, res) => { 

   checkRole(req, res);
    

    res.status(200).send('Este es un recurso protegido solo para administradores');
});

server.get('/recurso/publico', (req, res) => { 
   res.status(200).send('Este es un recurso publico');
});

// Control de rutas inexistentes
server.use('*', (req, res) => {   
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de peteciones
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {  
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});