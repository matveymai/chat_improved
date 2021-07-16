const socket = io() //создаем объект сокета

const messages = document.getElementById('messages') //элемент контейнера сообщений
const frm = document.getElementById('form') //элемент формы ввода
const input = document.getElementById('text') //элемент поля ввода текста

//функция добавления новых сообщений в чате
const addMessage = (message) => {
    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes()}`

    const div_line = document.createElement('div') //создаем контейнер для строки

    const div_text = document.createElement('div') //создаем контейнер для одного сообщения

    div_text.textContent = `${message} ${time}` //вносим в него текст нового сообщения
    div_text.setAttribute('id', 'message') //указываем для него id
    div_text.setAttribute('class', 'message-wrapper') //указываем для него class


    div_line.appendChild(div_text)
    messages.appendChild(div_line) //добавляем в общий контейнер
    messages.scrollTop = messages.scrollHeight //автоскролл вниз при новых сообщениях
    /*window.scroll(0, document.body.scrollHeight)*/
}

//добавляем обработчик при нажатии на отправить
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

//слушаем сообщения с сервера от других пользователей и выводим их в чат
socket.on('message_from_server', (message) => {
    console.log(message.hello)
    console.log(message.data)
    addMessage(message.data)
})

socket.on('disconnect', (message) => {
    console.log(message.alert)
})
