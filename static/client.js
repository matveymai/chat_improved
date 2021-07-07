const socket = io();

const messages = document.getElementById('messageList');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
});

socket.on('message from client', (message) => {
    const item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scroll(0, document.body.scrollHeight);
})

socket.on('disconnect', (message) => {
    console.log(message.alert);
})