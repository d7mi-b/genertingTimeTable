const express = require('express');
require('dotenv').config();
const cros = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const departementsRoutes = require('./routes/departementsRoutes');

// express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(cros())

// port of server
const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.status(200).json({msg: 'Welcom to the server'});
})

app.use('/users', usersRoutes)
app.use('/departements', departementsRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})