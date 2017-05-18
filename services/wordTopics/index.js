const WordTopic = require('../../database/models/wordTopics');

function getAll() {
    return WordTopic.findAll()
        .catch(() => Promise.reject({ status: 500 }));
}

function getOne(topicId) {
    return WordTopic.findOne({ where: { id: topicId } })
        .catch(() => Promise.reject({ status: 500 }));
}

function create(wordTopic) {
    const name = wordTopic ? wordTopic.name : null;
    if(!name) {
        return Promise.reject({ status: 400, message: 'Incorrect word topic data'});
    }
    return new Promise((resolve, reject) => {
        WordTopic.findOrCreate({where: { name }})
            .spread((topic, created) => {
                if(!created) {
                    reject({ status: 400, message: 'Word topic is exist'});
                }
                resolve(topic.get());
            });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        WordTopic.findOne({ where: { id } })
            .then(wordTopic => {
                wordTopic.destroy()
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
}
