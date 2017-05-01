const Word = require('../../database/models/words');

function getAll(){
    return Word.findAll();
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
    getAll
}
