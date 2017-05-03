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
    return TestResult.findAll({where: {userId: userId}});
}

function getAllByUserIdTestId(userId, testId) {
    return TestResult.findAll({where: {userId: userId, testId: testId}});
}

module.exports = {
    create,
    getAllByUserId,
    getAllByUserIdTestId
}
