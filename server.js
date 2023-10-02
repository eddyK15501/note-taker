const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 5001;

// Routes imported from ./routes/notesRoutes
const notesRoutes = require('./routes/notesRoutes')

// Cors middleware
app.use(cors({
    origin: "same-origin", // Allow same-origin only
    methods: ['GET', 'POST', 'DELETE'], // Allow GET, POST, DELETE HTTP methods
    optionsSuccessStatus: 200 // Send '200 OK' as successful preflight response; for legacy browser compatibility
}))
// Middleware for serving static files
app.use(express.static('./public'))
// Router for /api/notes
app.use('/api/notes', notesRoutes)

// Send notes.html for path /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Send .index.html for all paths
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Server listening on localhost
app.listen(PORT, () => {
    console.log("Server listening on localhost:5001")
})