var fs = require("fs");
var http = require("https");

var privateKey = fs.readFileSync('sslcert/server.key').toString();
var certificate = fs.readFileSync('sslcert/server.crt').toString();

var credentials = {key: privateKey, cert: certificate};
console.log("Hola", privateKey, certificate);
var server = http.createServer(credentials,function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

var port = 3000;
var host = '162.214.64.26';

server.listen(port, function (e) {
    console.log('Servidor inicio en el puerto ' + port)
});