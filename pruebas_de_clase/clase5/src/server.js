const express = require("express");
const path = require("path");

const server = express();
const HOST = "127.0.0.1";
const PORT = 3000;

server.set("view engine", "ejs");
server.use("/public", express.static(path.join(__dirname, "public"))); //esto es para servir la carpeta public, sino no la puedo usar

server.get("/home", (req, res) => {
    res.status(200).render(path.join(__dirname, "views/pages/home"));
});
server.get("/example", (req, res) => {
    const personas = [
        { nombre: "Juan", apellido: "Perez", edad: 18, imagen: "http://127.0.0.1:3000/public/img/arg.png" },
        { nombre: "Pablo", apellido: "Paex", edad: 25, imagen: "http://127.0.0.1:3000/public/img/arg.png" },
        { nombre: "Lorena", apellido: "Troglio", edad: 15, imagen: "http://127.0.0.1:3000/public/img/arg.png" },
    ];
    res.status(200).render(path.join(__dirname, "views/pages/example"), { personas });
});
//1er parametro es la ruta y el 2do lo que quiero mandar

server.listen(PORT, HOST, () => console.log(`ejecutandose en http://${HOST}:${PORT}`));
