const jwt = require('jsonwebtoken');
const md5 = require('../../utils').md5;
const Token = require('../../database/models/tokens');
const User = require('../../database/models/users');

function isPasswordValid(password_hash, password) {
    return password_hash === md5(password);
}

function authenticate() {
    return (req, res, next) => {
        if(['/users', '/auth/login'].includes(req.originalUrl) && req.method === 'POST') return next();
        new Promise((resolve, reject) => {
            let token = req.headers.authorization;
            if (!token || !token.length) return reject({status: 401, message: 'Incorrect token'});
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) reject({status: 401, message: 'Incorrect token'});
                resolve(token);
            });
        })
            .then(token => {
                Token.findOne({ where: { value: token }})
                    .then(tokenData => {
                        if(!tokenData || !tokenData.get().isValid) {
                            res.status(401);
                            res.json({
                                data: 'Incorrect token',
                            });
                            return;
                        }
                        tokenData.getUser()
                            .then(user => {
                                req.user = user;
                                next();
                            });
                    });
            })
            .catch(err => {
                res.status(err.status);
                res.json({
                    data: err.message,
                });
            });
    };
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        if(!username || !password) return reject({ status: 401, message: 'Incorrect login or password' });
        User.findOne({ where: { username }})
            .then(user => {
                if(!user) return reject({ status: 401, message: 'No such user' });
                if(!isPasswordValid(user.get().passwordHash, password))
                    return reject({ status: 401, message: 'Incorrect password' });
                const jwtToken = jwt.sign({ data: username }, 'secret');
                Token.findOne({ id: user.get().id })
                    .then(tokenData => {
                        tokenData.set('value', jwtToken);
                        tokenData.set('isValid', true);
                        tokenData.save()
                            .then(() => {
                                resolve({token: jwtToken, user: user});
                            });
                    });
            });
    });
}

function logout(token) {
    return new Promise((resolve, reject) => {
        Token.findOne({ where: { value: token }})
            .then(tokenData => {
                tokenData.set('isValid', false);
                tokenData.save()
                    .then(() => {
                        resolve({});
                    });
            });
    });
}

module.exports = {
    authenticate,
    login,
    logout,
};