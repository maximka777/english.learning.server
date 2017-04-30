const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Test = sequelize.define('test', {
    id: {
        type: Sequelize.INTEGER,
        field: 'test_id',
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = Test;