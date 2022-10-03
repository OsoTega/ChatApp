const user = JSON.parse(sessionStorage.getItem("userStore"));
const loggedIn = sessionStorage.getItem("loggedIn");
const ws = new WebSocket("ws://localhost:8082");
ws.addEventListener('open', ()=>{
    var jsonMessage = {
        type: 'LOGIN',
        id: user.id,
    }
    ws.send(JSON.stringify(jsonMessage));
});

ws.addEventListener('error', (event)=>{
   /*alert("Oops Connection Error", "There was an error communicating with the server, Check your connection", "Retry", ()=>{
    const ws = new WebSocket("ws://localhost:8082");
ws.addEventListener('open', ()=>{

});
});*/
});

var messagesReceived = new Map();
const messageTempStore = [];

const url = "http://192.168.64.2/ChatServer";