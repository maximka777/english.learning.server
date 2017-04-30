const sequelize = require('../../index');
const Sequelize = require('sequelize');
const User = require('../users');

const Token = sequelize.define('token', {
    id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        primaryKey: true,
    },
    value: {
        type: Sequelize.TEXT,
        defaultValue: '',
    },
    isValid: {
        type: Sequelize.BOOLEAN,
        field: 'is_valid',
        defaultValue: true,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

Token.belongsTo(User);

module.exports = Token;
