let socket = new WebSocket("wss://chat.stormyyy.dev");
let connected = false;

socket.onopen = function(event) {
  console.log("Connection with server (chat.stormyyy.dev) established!");
  connected = true;
};

socket.onclose = function(event) {
  console.log("Connection with server closed.");
  connected = false;
};

let username = prompt("Enter your username: ", "storm");
let password = prompt("Enter your password", "abc123!");
let msg_content = prompt("Enter a message to send: ");
socket.send(`${username},${password},${msg_content}`);