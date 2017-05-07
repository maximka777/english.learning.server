const WordTopic = require('../../database/models/wordTopics');

function getAll() {
    return WordTopic.findAll();
}

function getOne(topicId) {
    return WordTopic.findOne({ where: { id: topicId } });
}

function create(wordTopic) {
    return new Promise((resolve, reject) => {
        WordTopic.findOrCreate({where: {name: wordTopic.name}})
            .spread((topic, created) => {
                if(!created) {
                    reject({ status: 400, message: 'Word topic is exist'});
                }
                resolve(topic);
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
            });
    });
}

module.exports = {
    getAll,
    create,
    remove,
    getOne,
}
