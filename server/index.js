var express = require('express'); // look for express in file
var socket = require('socket.io');

// App setup
var app = express();
var port = process.env.PORT || 9000
var server = app.listen(port, function () {
    console.log('server running at port: ' + port);
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);
io.on('connection', function (socket) {
    console.log('Socket connection:', socket.id);

    // Handle chat event
    // When I hear chat message sent to me, fire callback 
    // function to receive data and pass function
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});