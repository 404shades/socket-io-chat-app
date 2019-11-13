const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');



const app = express();
const server = http.createServer(app);
const io = socket(server);



io.on('connection',(socket)=>{
    console.log("New Connection added");
    socket.emit('message','Welcome Babes!!');
    socket.on('sendMessage',(data,callback)=>{
        io.emit('message',data);
        callback();
    })
    socket.on('sendLocation',(data,callback)=>{
        io.emit('message',data);
        callback();
    })
});



const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,"../public");
app.use(express.static(publicDirectoryPath));
server.listen(PORT,()=>{
    console.log("Server Started at " + PORT);
});