const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306, // optional default-port anyways it takes 3306
    user: 'root',
    password: 'Mysql@2023',
    database: 'nodejs-course-udemy-max'
});

module.exports = pool.promise();