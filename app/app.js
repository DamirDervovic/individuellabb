const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('public'))

server.listen(3000, () => {})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html')
})

app.get('/create', (req, res) => {
    res.sendFile(__dirname + '/create.html')
})

app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/search.html')
})

const chatRoom = 'chat room'
const chatWaitingRoom = 'chat waiting room'
let peopleInChat = 0
let clientId = null
let counter = 0
let randomResponse

const literaryQuotes = [
    '"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife." - Pride and Prejudice by Jane Austen',
    '"The greatest glory in living lies not in never falling, but in rising every time we fall." - Long Walk to Freedom by Nelson Mandela',
    '"The only way out of the labyrinth of suffering is to forgive." - Looking for Alaska by John Green',
    '"Do I dare disturb the universe?" - The Love Song of J. Alfred Prufrock by T.S. Eliot'
]

const randomQuote =
    literaryQuotes[Math.floor(Math.random() * literaryQuotes.length)]

const librarianResponses = [
    'Ett ögonblick så ska jag hjälpa dig.',
    'Jag hjälper dig så snart jag kan. Här är ett citat ur en bok medan du väntar: ' +
        randomQuote,
    'Svarar snart! Patience is a virtue! (En fras som tros ha sitt ursprung från dikten "Piers Plowman", skriven år 136O av den engelska poeten William Langland)'
]

getResponse = () => {
    if (counter > librarianResponses.length - 1) {
        counter = 0
        randomResponse = librarianResponses[counter]
    }
    randomResponse = librarianResponses[counter]
    counter++
}

io.on('connection', (socket) => {
    counter = 0
    peopleInChat++

    if (peopleInChat <= 1) {
        clientId = socket.id
        socket.join(chatRoom)
        socket.emit('server message', 'Hej! Hur kan jag hjälpa dig?')
    } else {
        socket.join(chatWaitingRoom)
        socket.emit(
            'server message',
            'Hej! Just nu är chatten full, du är placerad i kö'
        )
    }

    socket.on('disconnect', () => {
        peopleInChat--
    })

    socket.on('chat message', (message) => {
        io.to(chatRoom).emit('chat message', message, {
            message,
            id: socket.id
        })
        if (socket.id === clientId) {
            getResponse()
            socket.emit('server message', randomResponse)
        }
    })
})
