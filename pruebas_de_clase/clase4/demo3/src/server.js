const express = require("express");

const server = express();
const path = require("path");

const PORT = 3000;
const HOST = "localhost";

//middleware (siempre se declaran arriba)
server.use("/public",express.static(path.join(__dirname, "public")));
//aca estoy habilitando todo el contenido de la carpeta public con una ruta estatica

//ruta
server.get("/", (req,res) =>{
    res.status(200).send("<h1>Bienvenidos</h1>");
});
//ruta
server.get("/materia", (req, res) => {
    res.status(200).send("<h3>Esto es programacion backend</h3>");
});

// server.use((req, res) =>{
//     res.status(404).send("<h3>Recurso no encontrado</h3>");
// siempre que encontremos un use va a ser un middeware, este captura los errores, pero es mejor usa get con "*"
// });
//manejo de errores de rutas
server.get("*", (req, res) => {
    res.status(404).send("<h3>Recurso no encontrado</h3>");
});

server.listen(PORT, HOST, () => console.log(`Ejecutandose en http://${HOST}:${PORT}`));