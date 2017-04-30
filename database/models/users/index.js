const sequelize = require('../../index');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        primaryKey: true,
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
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = User;