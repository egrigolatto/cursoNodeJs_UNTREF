const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

function generateToken(username, isAdmin) {
    return jwt.sign({ username, isAdmin }, process.env.SECRET_KEY, { expiresIn: '30s' });
}

function verifyToken(req, res, next) {
    const authorizationHeader = req.get('authorization');
    const token = authorizationHeader && authorizationHeader.split(' ')[1];

    if (!token) return res.status(400).send('empty token');

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        // Debe responder un código HTTP 401. Esto sucede cuando la API le
        // responde al cliente que las credenciales que proporcionó son inválidas.
        if (error) return res.status(401).send(error.message);

        req.username = decoded.username;
        req.isAdmin = decoded.isAdmin;

        next();
    });
}

function checkRole(req, res, next) {
    // Debe responder un código HTTP 403. Esto sucede cuando la API le responde
    // al cliente que las credenciales que proporcionó son válidas, pero que
    // necesita los privilegios apropiados para realizar la acción solicitada.
    if (!req?.isAdmin) return res.status(403).send('No tienes los privilegios de acceso');

    next();
}

module.exports = { generateToken, verifyToken, checkRole };