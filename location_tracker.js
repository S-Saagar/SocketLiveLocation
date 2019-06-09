/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global __dirname */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log('server listening on port ' + port);
    io.on('connection', onConnection);
});

app.get('/', function (req, res) {
    res.send('connected');
});

function onConnection(socket) {
    printLog('A user connected:: ' + socket.id);

    socket.on('message', function (message) {
        printLog(message);
        io.emit('message', message);
    });

    socket.on('disconnect', function () {
        printLog('A user disconnected:: ' + socket.id);
    });
}


