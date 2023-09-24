const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs-course-max-sequelize', 'root', 'Mysql@2023', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    operatorsAliases: false
});

module.exports = sequelize;