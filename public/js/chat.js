const socket = io();
socket.on('newConnection',(message)=>{
    console.log(message);
})