const sequelize = require('../../index');
const Sequelize = require('sequelize');
const QuestionAnswer = require('../questionAnswers');

const TestQuestion = sequelize.define('test_question', {
    id: {
        type: Sequelize.INTEGER,
        field: 'question_id',
        primaryKey: true,
        autoIncrement: true,
    },
    questionText: {
        type: Sequelize.TEXT,
        field: 'question_text'
    },
    testId: {
        type: Sequelize.INTEGER,
        field: 'test_id',
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

TestQuestion.hasMany(QuestionAnswer, { foreignKey: 'question_id', as: 'answers' });

module.exports = TestQuestion;