// Express.js import statement; 'cors' & 'path' modules brought in
const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 5001;

// Routes imported from ./routes/notesRoutes
const notesRoutes = require('./routes/notesRoutes')

// Cross-Origin Resource Sharing Middleware
app.use(cors({
    origin: "same-origin", // allow only same-origin
    methods: ['GET', 'POST', 'DELETE'], // allow only GET, POST, DELETE http methods
    optionsSuccessStatus: 200 // send '200 OK' as successful preflight response; for legacy browser compatibility
}))
// Middleware for serving static files in the ./public folder
app.use(express.static('./public'))
// Router for /api/notes mounted as middleware
app.use('/api/notes', notesRoutes)

// Send ./public/notes.html for path /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Send ./public/index.html for all paths
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Server listening on localhost
app.listen(PORT, () => {
    console.log("Server listening on localhost:5001")
})