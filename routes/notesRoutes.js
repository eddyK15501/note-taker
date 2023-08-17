// Express.js, path, and fs modules; uuidv4 for generating unique id
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

// GET /api/notes
router.get('/', (req, res) => {
    res.json(notesData)
})

// POST /api/notes
router.post('/', async (req, res) => {
    // Create key of "id", value of uuidv4() for the new note object
    req.body.id = uuidv4(); 
    notesData.push(req.body)

    const dbFilePath = path.join(__dirname, '../db/db.json')

    // writeFile() to update db.json array; if successful: send .json with status code 201 for "created"
    try {
        fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2))
        res.status(201).json(req.body)
        console.log(notesData)
    } catch (error) {
        console.log("Error writing to mock db.json")
        res.status(500).json({ error: "Error; Note was not written to db.json" })
    }
})

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
    // Destructure id from req.params, being sent from the frontend index.js fetch() param
    const { id } = req.params
    
    // Get index of the note with the specific id that matches in the db.json array
    const noteToDelete = notesData.findIndex(note => note.id === id)

    if (noteToDelete === -1) {
        return res.status(404).json({ error: 'Note with id not found' })
    }

    // Remove note from the db.json array
    notesData.splice(noteToDelete, 1)

    const dbFilePath = path.resolve('db', 'db.json')

    // writeFile() to update db.json array; if successful: send status code of 204 for "no-content";
    try {
        fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2))
        res.status(204).json(notesData)
        console.log(notesData)
    } catch {
        console.log("Error deleting note from mock db.json")
        res.status(500).json({ error: "Error; Note was not written to db.json" })
    }
})

module.exports = router