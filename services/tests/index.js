const Test = require('../../database/models/tests');
const TestTopic = require('../../database/models/testTopics');
const TestQuestion = require('../../database/models/testQuestions');
const QuestionAnswer = require('../../database/models/questionAnswers');

function getAll() {
    return Test.findAll()
}

function getAllByTopicId(topicId) {
    return Test.find({ where: { topicId } });
}

function create(test) {
    return new Promise((resolve, reject) => {
        Test.findOrCreate({where: {name: test.name}, defaults: { topicId: test.topicId } })
            .spread((testResult, created) => {
                if (!created) return reject({status: 400, message: 'Such test is exist'});
                TestTopic.findOne({where: {id: test.topicId}})
                    .then(topicResult => {
                        if(!topicResult) return reject({ status: 400, message: 'Topic doesn\'t exist' });
                        Promise.all(test.questions.map(question => {
                            return new Promise((resolve_, reject_) => {
                                TestQuestion.create({questionText: question.questionText, testId: testResult.get('id')})
                                    .then(questionResult => {
                                        Promise.all(question.answers.map(answer => {
                                            return new Promise((resolve__, reject__) => {
                                                QuestionAnswer.create({answerText: answer.answerText, isCorrect: answer.isCorrect, questionId: questionResult.get('id')})
                                                    .then(answerResult => {
                                                                resolve__();
                                                    });
                                            });
                                        }))
                                            .then(() => resolve_({}));
                                    });
                            });
                        }))
                            .then(() => resolve({}));
                    });
            });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        Test.findOne({where: {id}})
            .then(testResult => {
                testResult.destroy()
                    .then(() => {
                        resolve({});
                    });
            });
    });
}

module.exports = {
    getAll,
    getAllByTopicId,
    create,
    remove,
};