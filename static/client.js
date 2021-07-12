const socket = io()

const messages = document.getElementById('messages')
const frm = document.getElementById('form_text')
const input = document.getElementById('input_text')

const addMessage = (message) => {
    const li = document.createElement('li')
    li.textContent = message
    messages.appendChild(li)
    window.scroll(0, document.body.scrollHeight)
}

frm.addEventListener('submit',  (event) => {
    event.preventDefault()
    if (input.value) {
        socket.emit('message_from_client', input.value)
        addMessage(input.value)
        console.log(input.value)
        input.value = ''
    }
})

/*frm.addEventListener('keypress', (event) => {
    socket.emit('typing')
})

socket.on('user_is_typing', () => {
    addMessage('someone is typing message...')
})*/

socket.on('message_from_server', (message) => {
    console.log(message.hello)
    console.log(message.data)
    addMessage(message.data)
})

socket.on('disconnect', (message) => {
    console.log(message.alert);
})
