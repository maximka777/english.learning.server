const Test = require('../../database/models/tests');
const TestTopic = require('../../database/models/testTopics');
const TestQuestion = require('../../database/models/testQuestions');
const QuestionAnswer = require('../../database/models/questionAnswers');

function getAll() {
    return Test.findAll()
}

function getAllByTopicId(topicId) {
    return Test.findAll({
        where: { topicId: topicId },
        include: [ { model: TestQuestion,
            include: [{ model: QuestionAnswer}]
        }]
    });
}

function getAnswersFromQuestion(question) {
    return question.getAnswers();
}

function getOne(testId) {
    Test.find({
        where: {id: testId},
        include: [{ model: TestQuestion,
            include: [{model: QuestionAnswer}]
        }]
    });
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
            });
    });
}

module.exports = {
    getAll,
    getAllByTopicId,
    getOne,
    create,
    remove
};