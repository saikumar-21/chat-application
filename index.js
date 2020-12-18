const express = require('express');
const path = require("path");
const app = express();
var http = require('http').createServer(app);
const io = require('socket.io')(http)
const port = process.env.port || 5000;

app.use('/static', express.static('static'));
app.use(express.urlencoded());

const user = {};
io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('recieve',{message: message, name:user[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',user[socket.id])
        delete user[socket.id]
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname+ '/index.html');
});

http.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  });
