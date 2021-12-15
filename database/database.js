const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', 'douglas8009', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;