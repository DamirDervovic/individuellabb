var socket = io()

const chatBtn = document.querySelector('#chat-btn')
const chatMessageBox = document.querySelector('.chat-message-box')

chatBtn.addEventListener('click', () => {
    let chatMessage = document.querySelector('#chat-message').value
    let message = `${chatMessage}`
    socket.emit('chat message', message)
    clearInput()
})

clearInput = () => {
    let chatInput = document.querySelector('#chat-message')
    chatInput.value = ''
}

socket.on('chat message', (message) => {
    const chatMessageBox = document.querySelector('.chat-message-box')
    chatMessageBox.innerHTML += `<div class="chat-client-message">${message}</div>`
})

socket.on('server message', (message) => {
    const chatServerMessage = document.querySelector('.chat-message-box')
    chatServerMessage.innerHTML += `<div class="chat-server-message">${message}</div>`
})
