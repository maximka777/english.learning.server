const Word = require('../../database/models/words');

function getAll(){
    return Word.findAll();
}

function getAllByTopicId(topicId) {
    return Word.findAll({where: {topicId: topicId}});
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

function remove(id) {
    return new Promise((resolve, reject) => {
        Word.findOne({ where: { id } })
            .then(word => {
                word.destroy()
                    .then(() => {
                        resolve({});
                    });
            });
    });
}

module.exports = {
    create,
    getAll,
    getAllByTopicId,
    remove
}
