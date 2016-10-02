var http = require("http");
var config = require("./config.js");

var requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!\n");
}

var server = http.createServer(requestListener);
server.listen(config.http.port);