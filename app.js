// Express.js import statement; 'path' module for file paths
const express = require('express');
const app = express()
const path = require('path')

const PORT = 5001
const notesRoutes = require('./routes/notesRoutes')

// Middleware for serving static files in the ./public folder
app.use(express.static('./public'))
// Router for /api/notes mounted as middleware
app.use('/api/notes', notesRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Server listening on localhost
app.listen(PORT, () => {
    console.log("Server listening on localhost:5001")
})