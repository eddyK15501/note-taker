const express = require('express');

const app = express()
const PORT = 5001



app.listen(PORT, () => {
    console.log("Server listening on localhost:5001")
})