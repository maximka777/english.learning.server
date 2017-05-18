const User = require('../../database/models/users');
const Token = require('../../database/models/tokens');
const md5 = require('../../utils').md5;
const jwt = require('jsonwebtoken');

function getAll() {
    return User.findAll()
        .catch(() => new Promise.reject({ status: 500}));
}

function create(user) {
    const username = user? user.username || null : null;
    const password = user? user.password || null : null;
    if(!(username && password)) {
        return new Promise.reject({ status: 400, message: 'Incorrect user data'})
    }
    return new Promise((resolve, reject) => {
        User.findOne({ where: { username } })
            .then(foundUser => {
                if(!foundUser) {
                    user.passwordHash = md5(password);
                    User.create(user)
                        .then((userData) => {
                            const newUser = userData.get();
                            Token.create({ id: newUser.id, value: jwt.sign({ data: username }, 'secret') })
                                .then(tokenData => {
                                    resolve({});
                                });

                        });
                } else {
                    reject({ status: 400, message: 'User is exist'});
                }
            });
    });
}

module.exports = {
    getAll,
    create,
};
