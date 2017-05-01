const TestTopic = require('../../database/models/testTopics');

function getAll() {
    return TestTopic.findAll()
}

function create(topic) {
    return new Promise((resolve, reject) => {
        TestTopic.findOrCreate({ where : { name: topic.name }, defaults: { complexity: topic.complexity } })
            .spread((topicResult, created) => {
                if(!created) return reject({ status: '400', message: 'Such test topic is exist' });
                resolve(topicResult.get());
            });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        TestTopic.findOne({ where: { id } })
            .then(topic => {
               topic.destroy()
                   .then(() => {
                        resolve({});
                   });
            });
    });
}

module.exports = {
    getAll,
    create,
    remove,
};