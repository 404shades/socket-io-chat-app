const socket = io();
socket.on('message',(message)=>{
    console.log(message);
})
const messageForm = document.querySelector("#message-form");
messageForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    socket.emit('sendMessage',event.target.elements.messageField.value);
})
document.querySelector("#sendLocation").addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browswer");
    }else{
        navigator.geolocation.getCurrentPosition((location)=>{
            socket.emit('sendLocation',{latitude:location.coords.latitude,longitude:location.coords.longitude})
        });
    }
})