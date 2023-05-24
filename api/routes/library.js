const express = require('express')
const router = express.Router()
const controller = require('../controllers/libraryController')

router.get('/', async (req, res) => {
    await controller.getAll(req, res)
})

router.get('/availability/:bookId', async (req, res) => {
    await controller.getBookAvailability(req, res)
})

router.get('/search', async (req, res) => {
    await controller.search(req, res)
})

router.post('/add', async (req, res) => {
    await controller.add(req, res)
    res.sendStatus(200)
})

router.put('/edit', async (req, res) => {
    await controller.edit(req, res)
    res.sendStatus(200)
})

router.delete('/remove', async (req, res) => {
    await controller.remove(req, res)
    res.sendStatus(200)
})

module.exports = router
