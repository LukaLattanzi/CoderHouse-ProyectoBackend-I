const socket = io();
let username = localStorage.getItem("chatUsername");

function askUsername() {
  Swal.fire({
    title: 'Identifícate',
    input: 'text',
    inputLabel: 'Nombre de usuario',
    inputPlaceholder: 'Ingresa tu nombre de usuario',
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) return 'Debes ingresar un nombre de usuario';
    }
  }).then(result => {
    username = result.value;
    localStorage.setItem("chatUsername", username);
    socket.emit("registerUser", username);
    document.getElementById("chat-container").style.display = "block";
  });
}

if (!username) {
  askUsername();
} else {
  socket.emit("registerUser", username);
  document.getElementById("chat-container").style.display = "block";
}

const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit("newMessage", { user: username, text: input.value });
    input.value = "";
  }
});

socket.on("messageList", (msgs) => {
  messagesDiv.innerHTML = "";
  (Array.isArray(msgs) ? msgs : [msgs]).forEach(msg => {
    const div = document.createElement("div");
    div.textContent = msg.user ? `${msg.user}: ${msg.text}` : msg.text;
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});