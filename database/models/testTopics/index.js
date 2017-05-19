const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Test = require('../tests');

const TestTopic = sequelize.define('test_topic', {
    id: {
        type: Sequelize.INTEGER,
        field: 'test_topic_id',
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    complexity: {
        type: Sequelize.INTEGER,
        field: 'complexity_level',
        defaultValue: 1,
        validate: {
            max: 10,
            min: 1,
        },
    },
    theory: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

TestTopic.hasMany(Test, { foreignKey: 'test_topic_id' });

module.exports = TestTopic;