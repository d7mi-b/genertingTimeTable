const express = require('express');
require('dotenv').config()
const { createPool }= require('mysql2')

// express app
const app = express();

// port of server
const PORT = process.env.PORT;

//database Connection 
const pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: process.env.MYSQL_CONNECTION
}).promise()

//run this query in mysql workbench to activate 
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';


//test Query 

pool.query('select * from employee').then( result => { 
    
    return console.log(result[0])
})

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Welcom to the server'});
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})



module.exports = pool;