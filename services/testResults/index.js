const TestResult = require('../../database/models/testResults');

function create(testResult) {
    const testId = testResult ? testResult.testId || null : null;
    const userId = testResult ? testResult.userId || null : null;
    const passDate = testResult ? testResult.passDate || null : null;
    const correctCount = testResult ? testResult.correctCount || null : null;
    const totalCount = testResult ? testResult.totalCount || null : null;
    if(!(testId && testId > 0 && userId && userId > 0 && passDate && correctCount && correctCount > -1)) {
        return Promise.reject({
            status: 400,
            message: 'Incorrect test result data'
        })
    }
    if(totalCount <= 0 || (correctCount > totalCount) ) {
        return Promise.reject({ status: 400, message: 'Incorrect test result data'})
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
        .catch(() => Promise.reject({ status: 500 }));
}

function getAllByUserIdTestId(userId, testId) {
    return TestResult.findAll({where: {userId: userId, testId: testId}})
        .catch(() => Promise.reject({ status: 500 }));
}

module.exports = {
    create,
    getAllByUserId,
    getAllByUserIdTestId
}
