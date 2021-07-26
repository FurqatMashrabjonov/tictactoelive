const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('move', indexes => {
        socket.broadcast.emit('move', indexes)
    })

    socket.on('input_room', data => {
        socket.broadcast.emit('input_room', data)
    })

    socket.on('user2_joined', data => {
        socket.broadcast.emit('user2_joined', data)
    })


});
