const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const libraryRouter = require('./routes/library')
app.use('/library', libraryRouter)

const port = 3001

app.listen(port, () => {
    console.log('listening to port 3001')
})
