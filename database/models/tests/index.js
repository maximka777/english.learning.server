const sequelize = require('../../index');
const Sequelize = require('sequelize');
const TestQuestion = require('../testQuestions');

const Test = sequelize.define('test', {
    id: {
        type: Sequelize.INTEGER,
        field: 'test_id',
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

Test.hasMany(TestQuestion, { foreignKey: 'test_id' });

module.exports = Test;