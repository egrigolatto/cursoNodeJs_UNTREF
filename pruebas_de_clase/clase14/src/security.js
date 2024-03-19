const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({path: path.join(__dirname, '../.env')});

function generateToken(username, isAdmin) {
    return jwt.sign({ username, isAdmin },  process.env.SECRET_KEY, { expiresIn: '1m' } );
}

function verifyToken(req, res, next) {
    const authorizationHeader = req.get('authorization');
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
    //console.log(token);

    if (!token) return res.status(400).send('empty token');
        
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).send(error.message);     
        
        req.username = decoded.username;
        req.isAdmin = decoded.isAdmin;
    });

    next();
}

function checkRole(req, res) {
    if (!req.isAdmin) return res.status(403).send('no estas autorizado');
        
}
module.exports = { generateToken, verifyToken, checkRole };