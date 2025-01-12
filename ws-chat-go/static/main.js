const chatbox = document.querySelector("#output");
let userField = document.querySelector("#username");
let messageField = document.querySelector("#message");
let socket = null;

window.onbeforeunload = () => {
  console.log("Leaving");
  socket.send(JSON.stringify({ action: "left" }));
};

document.addEventListener("DOMContentLoaded", () => {
  socket = new ReconnectingWebSocket("ws://localhost:8080/ws", null, {
    debug: true,
    reconnectInterval: 3000,
  });

  const offline = "<span class='badge bg-danger'>Not connected</span>";
  const online = "<span class='badge bg-success'>Connected</span>";

  let statusDiv = document.querySelector("#status");

  socket.onopen = () => {
    console.log("Successfully connected");
    statusDiv.innerHTML = online;
  };

  socket.onclose = () => {
    console.log("Connection closed");
    statusDiv.innerHTML = offline;
  };

  socket.onerror = (e) => {
    console.log(`There was an error: ${e}`);
    statusDiv.innerHTML = offline;
  };

  socket.onmessage = (msg) => {
    const event = JSON.parse(msg.data);

    switch (event.action) {
      case "list_users":
        const ul = document.querySelector("#online_users");
        while (ul.firstChild) ul.removeChild(ul.firstChild);

        for (let user of event.connected_users) {
          li = document.createElement("li");
          li.innerText = user;
          ul.append(li);
        }
        break;

      case "broadcast":
        chatbox.innerHTML += event.message + "<br>";
        break;
    }
  };

  userField.addEventListener("change", (e) => {
    socket.send(
      JSON.stringify({
        action: "username",
        username: e.target.value,
      }),
    );
  });

  messageField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      if (!socket) {
        console.log("No connection");
        return false;
      } else {
        if (userField.value === "" || messageField.value === "") {
          errorMessage("Fill out Username and Message");
          return false;
        } else {
          sendMessage();
        }
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });

  document.querySelector("#send-button").addEventListener("click", (e) => {
    if (userField.value === "" || messageField.value === "") {
      errorMessage("Fill out Username and Message");
      return false;
    } else {
      sendMessage();
    }
  });
});

function sendMessage() {
  const data = {
    action: "broadcast",
    username: userField.value,
    message: messageField.value,
  };
  socket.send(JSON.stringify(data));
  messageField.value = "";
}

function errorMessage(text) {
  notie.alert({
    type: "error",
    text,
    stay: false,
    time: 3,
    position: "top",
  });
}
