var express = require('express');
var socket = require('socket.io');

var app = express();
var port = process.env.PORT || 9000
var server = app.listen(port, function () {
    console.log('server running at port: ' + port);
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', function (socket) {
    console.log('Socket connection:', socket.id);
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});