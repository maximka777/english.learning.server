const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Test = require('../tests');

const TestResult = sequelize.define('test_result', {
    id: {
        type: Sequelize.INTEGER,
        field: 'test_result_id',
        primaryKey: true,
        autoIncrement: true,
    },
    correctCount: {
        type: Sequelize.INTEGER,
        field: 'correct_count'
    },
    totalCount: {
        type: Sequelize.INTEGER,
        field: 'total_count'
    },
    passDate: {
        type: Sequelize.BIGINT,
        field: 'pass_date'
    },
    testId: {
        type: Sequelize.INTEGER,
        field: 'test_id',
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

TestResult.belongsTo(Test, { foreignKey: 'test_id' });

module.exports = TestResult;