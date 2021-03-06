const sequelize = require('../../index');
const Sequelize = require('sequelize');

const QuestionAnswer = sequelize.define('question_answer', {
    id: {
        type: Sequelize.INTEGER,
        field: 'answer_id',
        primaryKey: true,
        autoIncrement: true,
    },
    answerText: {
        type: Sequelize.TEXT,
        field: 'answer_text',
    },
    isCorrect: {
        type: Sequelize.BOOLEAN,
        field: 'is_correct',
        defaultValue: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        field: 'question_id',
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = QuestionAnswer;