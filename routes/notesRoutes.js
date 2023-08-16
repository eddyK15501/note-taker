const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

// Mock database for notes data storage
const notesData = require('../db/db.json');

// Create a router
const router = express.Router();
// Middleware for parsing incoming JSON data on the router
router.use(express.json());

// Routes defined for /api/notes
router.get('/', (req, res) => {
    res.json(notesData)
})

router.post('/', async (req, res) => {
    const { title, text } = req.body
    const newNote = { title, text }
    notesData.push(newNote)

    const dbFilePath = path.resolve('db', 'db.json')
    try {
        fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2))
        console.log(notesData)
    } catch (error) {
        console.error("Error writing to mock db.json", error)
        res.status(500).send("Error saving note")
    }
})

router.delete('/:id', (req, res) => {

})

module.exports = router