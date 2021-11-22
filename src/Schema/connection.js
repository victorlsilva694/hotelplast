const Sequelize = require('sequelize');

const Connection = new Sequelize('hotelplast', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = Connection;