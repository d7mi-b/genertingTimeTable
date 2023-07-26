const express = require('express');
require('dotenv').config();
const cros = require('cors');
const cluster = require('cluster')

const usersRoutes = require('./routes/usersRoutes');
const departementsRoutes = require('./routes/departementsRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const batchesRoutes = require('./routes/batchesRoutes');
const lecturersRoutes = require('./routes/lecturerRoutes');
const hallTypesRoutes = require('./routes/hallTypesRoutes');
const hallsRoutes = require('./routes/hallsRoutes');
const coursesRoutes = require('./routes/coursesRoutes')
const moduleRoutes = require('./routes/moduleRoutes')
const requestRoutes = require('./routes/requestRoutes');
const systemStateRoutes = require('./routes/systemstateRoutes');
const timeTableRoutes = require('./routes/timeTableRoutes');
const archiveRoutes = require('./routes/archiveRoutes');
const algorithmRoutes = require('./routes/algorithmRoutes');
const pdfRoutes = require('./routes/pdfRoutes')

// port of server
const PORT = process.env.PORT;

const totalCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });

} else {
    // express app
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true }));

    app.use(cros())
    console.log(`Worker ${process.pid} started`);

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
    app.use('/courses',coursesRoutes);
    app.use('/module',moduleRoutes);
    app.use('/requests',requestRoutes)
    app.use('/generatingTimetable', algorithmRoutes);
    app.use('/systemState', systemStateRoutes);
    app.use('/timeTable',timeTableRoutes);
    app.use('/archive', archiveRoutes);
    app.use('/pdf',pdfRoutes)
    
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}