const WordTopic = require('../../database/models/wordTopics');

function getAll() {
    return WordTopic.findAll();
}

function create(wordTopic) {
    console.log(wordTopic);
    return new Promise((resolve, reject) => {
        WordTopic.findOrCreate({where: {name: wordTopic.name}, default: {name: wordTopic.name}})
            .spread((topic, created) => {
                if(!created) {
                    reject({ status: 400, message: 'Word topic is exist'});
                }
                resolve(topic);
            });
    });
}

module.exports = {
    getAll,
    create
}
