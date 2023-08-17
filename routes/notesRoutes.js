const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

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
    req.body.id = uuidv4(); 
    notesData.push(req.body)

    const dbFilePath = path.resolve('db', 'db.json')
    try {
        fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2))
        res.status(201).json(req.body)
        // console.log(notesData)
    } catch (error) {
        console.error("Error writing to mock db.json", error)
        res.status(500).json({ error: "Error; Note was not written to db.json" })
    }
})

router.delete('/:id', async (req, res) => {
    const param = req.params
    console.log(param)
    res.send(param)
})

module.exports = router