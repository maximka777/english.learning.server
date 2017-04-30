const User = require('../../database/models/users');
const Token = require('../../database/models/tokens');
const md5 = require('../../utils').md5;
const jwt = require('jsonwebtoken');

function getAll() {
    return User.findAll();
}

function create(user) {
    return User.findOne({ where: { username: user.username } })
        .then(foundUser => {
            if(!foundUser) {
                user.passwordHash = md5(user.password);
                User.create(user)
                    .then((userData) => {
                        const jwtToken = jwt.sign({ data: user.username }, 'secret');
                        Token.create({ id: data.dataValues.id, value: jwtToken })
                            .then(tokenData => {
                                tokenData.getUser()
                                    .then(user => {
                                        console.log(user);
                                    });
                            });

                    });
            }
        });
}

module.exports = {
    getAll,
    create,
};
