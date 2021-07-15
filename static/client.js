const socket = io()

const messages = document.getElementById('messages')
const frm = document.getElementById('form')
const input = document.getElementById('text')

const addMessage = (message) => {
    const div = document.createElement('div')
    div.textContent = message
    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
    /*window.scroll(0, document.body.scrollHeight)*/
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
