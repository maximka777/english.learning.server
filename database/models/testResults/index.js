const sequelize = require('../../index');
const Sequelize = require('sequelize');

const TestResult = sequelize.define('test_result', {
    id: {
        type: Sequelize.INTEGER,
        field: 'test_result_id',
        primaryKey: true
    },
    correctCount: {
        type: Sequelize.INTEGER,
        field: 'correct_count'
    },
    passDate: {
        type: Sequelize.BIGINT,
        field: 'pass_date'
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

module.exports = TestResult;