const socket = io();


const form = document.getElementById("send-form");
const messageInput = document.getElementById("mesaageinp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = document.getElementById('messageinp').value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    document.getElementById('messageinp').value = null;
});

const name = prompt('Enter your name to chat');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat.`, 'right');
});

socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});