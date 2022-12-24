const express = require('express');
require('dotenv').config()

// express app
const app = express();

// port of server
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Welcom to the server'});
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})