const sequelize = require('../../index');
const Sequelize = require('sequelize');
const User = require('../users');

const Token = sequelize.define('token', {
    value: {
        type: Sequelize.TEXT,
    },
    isValid: {
        type: Sequelize.BOOLEAN,
        field: 'is_valid',
    },
}, {
    freezeTableName: true,
    timestamps: false
});

Token.belongsTo(User, {primaryKey: 'userId'});

console.log('User token is defined');

module.exports = Token;
