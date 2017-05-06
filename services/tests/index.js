const Test = require('../../database/models/tests');
const TestTopic = require('../../database/models/testTopics');

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
                        resolve({});
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
    remove
};