const Sequelize = require('sequelize');


const sequelize = new Sequelize('english_learning_db_model', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        supportBigNumbers: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

module.exports = sequelize;