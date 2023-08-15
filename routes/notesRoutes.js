const express = require('express');
// Mock database for notes data storage
const notesData = require('../db/db.json')

// Create a router
const router = express.Router()

// Routes defined for /api/notes
router.get('/', (req, res) => {
    res.json(notesData)
})

module.exports = router