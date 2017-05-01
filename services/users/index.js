const User = require('../../database/models/users');
const Token = require('../../database/models/tokens');
const md5 = require('../../utils').md5;
const jwt = require('jsonwebtoken');

function getAll() {
    return User.findAll();
}

function create(user) {
    return new Promise((resolve, reject) => {
        User.findOne({ where: { username: user.username } })
            .then(foundUser => {
                if(!foundUser) {
                    user.passwordHash = md5(user.password);
                    User.create(user)
                        .then((userData) => {
                            const newUser = userData.get();
                            Token.create({ id: newUser.id, value: jwt.sign({ data: user.username }, 'secret') })
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
