async function connect() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket("wss://chat.stormyyy.dev");

    socket.onopen = function(event) {
      console.log("Connection with server established!");
      resolve(socket);
    };

    socket.onerror = function (error) {
      console.log(error);
      reject(error);
    };
  })
}

(async () => {
  try {
    const socket = await connect();
    console.log("WebSocket connected:", socket);
    
    let username = prompt("Enter your username:", "bob");
    let password = prompt("Enter your password:", "bob");

    document.forms.message_send.onsubmit = function() {
      let out_msg = this.message.value;
      socket.send(`${username},${password},${out_msg}`);
      this.reset();
      this.message.focus();
      return false;
    }

    socket.onmessage = function(event) {
      let msg = event.data;
      if (msg === "[admin]: imsobored") {
        let doomElement = document.createElement("iframe");
        doomElement.src = "https://ustymukhman.github.io/webDOOM/public/";
        doomElement.width = "50%";
        doomElement.height = "400px";
        doomElement.style.border = "none";

        document.getElementById("messages").prepend(doomElement);
        return;
      }

      if (msg === "[admin]: minecraftforfree") {
        let mcElement = document.createElement("iframe");
        mcElement.src = "https://games.stormyyy.dev/minecraft";
        mcElement.width = "50%";
        mcElement.height = "400px";
        mcElement.style.border = "none";

        document.getElementById("messages").prepend(mcElement);
        return;
      }

      console.log(msg);

      let msgElement = document.createElement("div");
      msgElement.textContent = msg;
      document.getElementById("messages").prepend(msgElement);
    }

    setInterval(() => {
      socket.send("ping");
      //console.log("Sent ping to server");
    }, 10000);

  } catch (error) {
    console.error("Failed to connect:", error);
  }
})();
