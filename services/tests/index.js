const Test = require('../../database/models/tests');
const TestTopic = require('../../database/models/testTopics');
const TestQuestion = require('../../database/models/testQuestions');
const QuestionAnswer = require('../../database/models/questionAnswers');

function getAll() {
    return Test.findAll()
        .catch(() => new Promise.reject({ status: 500 }));
}

function getAllByTopicId(topicId) {
    return Test.findAll({
        where: { topicId: topicId },
        include: [ {
            model: TestQuestion,
            as: 'questions',
            include: [{
                model: QuestionAnswer,
                as: 'answers'
            }]
        }]
    })
        .catch(() => new Promise.reject({ status: 500 }));
}

function getAnswersFromQuestion(question) {
    return question.getAnswers();
}

function getOne(testId) {
    return Test.find({
        where: {id: testId},
        include: [{ model: TestQuestion, as: 'questions',
            include: [{model: QuestionAnswer, as: 'answers'}]
        }]
    })
        .catch(() => new Promise.reject({ status: 500 }));
}

function create(test) {
    return new Promise((resolve, reject) => {
        Test.findOrCreate({where: {name: test.name}, defaults: { topicId: test.topicId } })
            .spread((testResult, created) => {
                if (!created) return reject({status: 400, message: 'Such test is exist'});
                TestTopic.findOne({where: {id: test.topicId}})
                    .then(topicResult => {
                        if(!topicResult) return reject({ status: 400, message: 'Topic doesn\'t exist' });
                        resolve(testResult.get());
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
            })
            .catch(() => new Promise.reject({ status: 500 }));
    });
}

module.exports = {
    getAll,
    getAllByTopicId,
    getOne,
    create,
    remove
};