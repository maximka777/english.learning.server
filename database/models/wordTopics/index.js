const sequelize = require('../../index');
const Sequelize = require('sequelize');
const Word = require('../words');

const WordTopic = sequelize.define('word_topic', {
    id: {
        type: Sequelize.INTEGER,
        field: 'word_topic_id',
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

WordTopic.hasMany(Word, {foreignKey: 'word_topic_id'});

module.exports = WordTopic;
