const sequelize = require('../../index');
const Sequelize = require('sequelize');
const QuestionAnswer = require('../questionAnswers');

const TestQuestion = sequelize.define('test_question', {
    id: {
        type: Sequelize.INTEGER,
        field: 'question_id',
        primaryKey: true
    },
    questionText: {
        type: Sequelize.TEXT,
        field: 'question_text'
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

TestQuestion.hasMany(QuestionAnswer, { foreignKey: 'question_id' });

module.exports = TestQuestion;