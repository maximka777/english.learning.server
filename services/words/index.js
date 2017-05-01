const Word = require('../../database/models/words');

function getAll(){
    return Word.findAll();
}

function getAllByTopicId(topicId) {
    return Word.findAll({where: {word_topic_id: topicId}});
}

function create(word) {
    return new Promise((resolve, reject) => {
        Word.create(word)
            .then(wordData => {
                resolve(wordData);
            })
            .catch(() => {
                reject({status: 400, message: "Error occurred"});
            });
    });
}

module.exports = {
    create,
    getAll,
    getAllByTopicId
}
