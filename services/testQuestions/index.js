const TestQuestion = require('../../database/models/testQuestions');
const QuestionAnswer = require('../../database/models/questionAnswers');

function create(question) {
    return new Promise((resolve, reject) => {
        TestQuestion.create({questionText: question.questionText, testId: question.testId})
            .then(questionResult => {
                Promise.all(question.answers.map(answer => {
                    return new Promise((resolve_, reject_) => {
                        QuestionAnswer.create({answerText: answer.answerText, isCorrect: answer.isCorrect, questionId: questionResult.get('id')})
                            .then(answerResult => {
                                resolve_(answerResult);
                            });
                    });
                }))
                    .then(answerResults => resolve({ question: questionResult, answers: answerResults}));
            });
    });
}

function getAllByTestId(testId) {
    return TestQuestion.find({where: {testId}});
}

function remove(id) {
    return new Promise((resolve, reject) => {
        TestQuestion.findOne({ where: { id } })
            .then(question => {
                question.destroy()
                    .then(() => {
                        resolve({});
                    });
            });
    });
}

module.exports = {
    getAllByTestId,
    create,
    remove
};