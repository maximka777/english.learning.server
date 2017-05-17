const TestResult = require('../../database/models/testResults');

function create(testResult) {
    const testId = testResult.testId || null;
    const userId = testResult.userId || null;
    const passDate = testResult.passDate;
    const correctCount = testResult.correctCount;
    if(!(testId && testId > 0 && userId && userId > 0 && passDate && correctCount && correctCount > -1)) {
        return new Promise.reject({
            status: 400,
            message: 'Incorrect test result data'
        })
    }
    return new Promise((resolve, reject) => {
        TestResult.create(testResult)
            .then(testResultData => {
                resolve(testResultData.get())
            })
            .catch(err => {
                reject({status: 500, message: 'Error occurred'});
            })
    })
}

function getAllByUserId(userId) {
    return TestResult.findAll({where: {userId: userId}})
        .catch(() => new Promise.reject({ status: 500 }));
}

function getAllByUserIdTestId(userId, testId) {
    return TestResult.findAll({where: {userId: userId, testId: testId}})
        .catch(() => new Promise.reject({ status: 500 }));
}

module.exports = {
    create,
    getAllByUserId,
    getAllByUserIdTestId
}
