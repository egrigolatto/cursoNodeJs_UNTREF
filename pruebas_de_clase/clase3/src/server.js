const http = require("http");

const HOST = "localhost";
const PORT = 3000;

const coches = [
    { marca: "Ford", anio: 2000},
    { marca: "Fiat", anio: 2005 },
    { marca: "Toyota", anio: 2023 },
]

const server = http.createServer((request,response)=>{

    // console.log(request.url);
    // console.log(request.method);

    if (request.url === "/ejemplo/texto") {
        response.writeHead(200, {"content-type": "text/plain;charset=utf8"});
        response.end("hola mundo!");
    }
    else if (request.url === "/ejemplo/html") {
        response.writeHead(200, { "content-type": "text/html;charset=utf8" });
        response.end("<h1>hola mundo!</h1>");
    }
    else if (request.url === "/ejemplo/json") {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(coches,null,"\t"));
    }
    else {
        response.writeHead(404, { "content-type": "text/plain;charset=utf8" });
        response.end("recurso no encontrado");
    }

    
});

server.on("request",(request) =>{
    console.log(request.url);
})

server.listen(PORT,HOST ,() => console.log(`El servidor se esta ejecuntando en http://${HOST}:${PORT}`));

//node --watch .\server.js