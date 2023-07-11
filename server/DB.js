const { createPool } = require('mysql2');

//database Connection 
const pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: process.env.MYSQL_CONNECTION
}).promise(console.log('Connected to DataBase'));

module.exports = pool;

//run this query in mysql workbench to activate 
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';