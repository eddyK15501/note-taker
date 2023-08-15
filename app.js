const express = require('express');
const app = express()

const PORT = 5001

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})

app.listen(PORT, () => {
    console.log("Server listening on localhost:5001")
})