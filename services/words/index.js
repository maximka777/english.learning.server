const Word = require('../../database/models/words');

function getAll(){
    return Word.findAll()
        .catch(() => Promise.reject({ status: 500 }));
}

function getAllByTopicId(topicId) {
    return Word.findAll({where: {topicId: topicId}})
        .catch(() => Promise.reject({ status: 500 }));
}

function create(word) {
    const english = word && word.english && word.english.length ? word.english : null;
    const russian = word && word.russian && word.russian.length ? word.russian : null;
    const topicId = word && word.topicId ? word.topicId : null;
    if(!(english && russian && topicId)) {
        return Promise.reject({ status: 400, message: 'Incorrect word data'});
    }
    return new Promise((resolve, reject) => {
        Word.create(word)
            .then(wordData => {
                resolve(wordData.get());
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
            })
            .catch(() => reject({ status: 500 }));
    });
}

module.exports = {
    create,
    getAll,
    getAllByTopicId,
    remove
}
