const socket = io();
const $messageForm = document.querySelector("#message-form");
const $messageInputField = $messageForm.querySelector('input');
const $messageSendButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#sendLocation');
socket.on('message',(message)=>{
    console.log(message);
})
$messageForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    $messageSendButton.setAttribute('disabled','disabled')
    socket.emit('sendMessage',event.target.elements.messageField.value,()=>{
        $messageInputField.value='';
        $messageSendButton.removeAttribute('disabled');
        $messageInputField.focus();
    });
})
$sendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browswer");
    }else{
        $sendLocationButton.setAttribute('disabled','disabled');
        navigator.geolocation.getCurrentPosition((location)=>{
            socket.emit('sendLocation',{latitude:location.coords.latitude,longitude:location.coords.longitude},()=>{
                $sendLocationButton.removeAttribute('disabled');
            })
        });
    }
})