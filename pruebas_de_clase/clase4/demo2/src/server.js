const http = require("http");

const PORT = 3000;
const HOST = "localhost";

const server = http.createServer((req,res) =>{
    res.writeHead(200, { "content-type": "text/plain;charset=utf8" });
    res.end("hola mundillo");
});

server.listen(PORT, HOST, () => console.log(`El servidor se esta ejecuntando en http://${HOST}:${PORT}`));