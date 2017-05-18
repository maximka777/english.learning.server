const TestQuestion = require('../../database/models/testQuestions');
const QuestionAnswer = require('../../database/models/questionAnswers');

function create(question) {
    const questionText = question.questionText || null;
    const testId  = question.testId || null;
    if(!(testId && testId > 0 && questionText && questionText.length)) {
        return Promise.reject({
            status: 400,
            message: 'Incorrect question data'
        });
    }
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
                    .then(answerResults => {
                        const result = Object.assign({}, questionResult.dataValues);
                        result.answers = answerResults;
                        resolve(result);
                    });
            });
    });
}

function getAllByTestId(testId) {
    return TestQuestion.find({where: {testId}})
        .catch(() => Promise.reject({ status: 500 }));
}

function remove(id) {
    return new Promise((resolve, reject) => {
        TestQuestion.findOne({ where: { id } })
            .then(question => {
                question.destroy()
                    .then(() => {
                        resolve({});
                    });
            })
            .catch(() => Promise.reject({ status: 500}));
    });
}

module.exports = {
    getAllByTestId,
    create,
    remove
};