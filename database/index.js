const Sequelize = require('sequelize');


const sequelize = new Sequelize('maksim-borovskij_eng-learn', '046370530_test', 'english-learning', {
    host: 'http://mysql.maksim-borovskij.myjino.ru:3306',
    dialect: 'mysql',
    dialectOptions: {
        supportBigNumbers: true
    }
});

module.exports = sequelize;