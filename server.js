'use strict';
var http = require('http');
var server = require('node-static');
var file = new server.Server('.');
const port = 5000;

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(port);

console.log(`Server running on ${port}`);