const socket = io()

const messages = document.getElementById('messages')
const frm = document.getElementById('form_text')
const input = document.getElementById('input_text')


frm.addEventListener('submit', function (event){
    event.preventDefault()
    if (input.value) {
      socket.emit('message_from_client', input.value)
      console.log(input.value)
      input.value = ''
    }
})

socket.on('Hi', (message) => {
    console.log(message)
})

/*socket.on('message from client', (message) => {
    const item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scroll(0, document.body.scrollHeight);
})*/

socket.on('disconnect', (message) => {
    console.log(message.alert);
})
