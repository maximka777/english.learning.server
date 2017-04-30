const sequelize = require('../../index');
const Sequelize = require('sequelize');
const TestResult  = require('../testResults');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
    },
    passwordHash: {
        type: Sequelize.STRING,
        field: 'password_hash',
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        field: 'is_admin',
        defaultValue: false,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

User.hasMany(TestResult, { foreignKey: 'user_id' });

module.exports = User;