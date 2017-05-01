const TestResult = require('../../database/models/testResults');

function create(testResult) {
    return new Promise((resolve, reject) => {
        TestResult.create(testResult)
            .then(testResultData => {
                resolve(testResultData)
            })
            .catch(err => {
                reject({status: 500, message: 'Error occurred'});
            })
    })
}

function getAllByUserId(userId) {
    return TestResult.findAll({where: {user_id: userId}});
}

function getAllByUserIdTopicId(userId, topicId) {
    return TestResult.findAll({where: {user_id: userId, topic_id: topicId}});
}

module.exports = {
    create,
    getAllByUserId,
    getAllByUserIdTopicId
}
