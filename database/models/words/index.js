const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Word = sequelize.define('word', {
    id: {
        type: Sequelize.INTEGER,
        field: 'word_id',
        primaryKey: true,
        autoIncrement: true,
    },
    english: {
        type: Sequelize.STRING
    },
    russian: {
        type:Sequelize.STRING
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

module.exports = Word;
