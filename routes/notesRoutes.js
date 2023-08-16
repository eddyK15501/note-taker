const express = require('express');
const path = require('path')
const fs = require('fs')

// Mock database for notes data storage
const notesData = require('../db/db.json')

// Create a router
const router = express.Router()
// Middleware for parsing incoming JSON data on the router
router.use(express.json())

// Routes defined for /api/notes
router.get('/', (req, res) => {
    res.json(notesData)
})

router.post('/', (req, res) => {
    const { title, text } = req.body
    const newNote = { title, text }
    console.log(newNote)
})

router.delete('/:id', (req, res) => {

})

module.exports = router