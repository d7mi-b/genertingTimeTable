const express = require('express');
require('dotenv').config();
const cros = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const departementsRoutes = require('./routes/departementsRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const batchesRoutes = require('./routes/batchesRoutes');
const lecturersRoutes = require('./routes/lecturerRoutes');
const hallTypesRoutes = require('./routes/hallTypesRoutes');
const hallsRoutes = require('./routes/hallsRoutes');
const coursesRoutes = require('./routes/coursesRoutes')

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
app.use('/building', buildingRoutes);
app.use('/colleges', collegeRoutes);
app.use('/batches', batchesRoutes);
app.use('/lecturers', lecturersRoutes);
app.use('/hallTypes', hallTypesRoutes);
app.use('/halls', hallsRoutes);
app.use('/courses',coursesRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})