const TestTopic = require('../../database/models/testTopics');

function getAll() {
    return TestTopic.findAll()
        .catch(() => Promise.reject({ status: 500 }));
}

function getOne(topicId) {
    return TestTopic.findOne({ where: { id: topicId } })
        .catch(() => Promise.reject({ status: 500 }));
}

function create(topic) {
    const name = topic ? topic.name || null : null;
    const complexity = topic ? topic.complexity || null : null;
    if(!(name && name.length && complexity && complexity > 0)) {
         return Promise.reject({ status: 400, message: 'Incorrect topic data'});
    }
    return new Promise((resolve, reject) => {
        TestTopic.findOrCreate({ where : { name }, defaults: { complexity } })
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
            })
            .catch(() => reject({ status: 500 }));
    });
}

module.exports = {
    getAll,
    create,
    remove,
    getOne,
};