const jwt = require('jsonwebtoken');

function authenticate() {
    return (req, res, next) => {
        new Promise((resolve, reject) => {
            let token = req.headers.authorization;
            if (!token || !token.length) return reject({status: 401, message: 'Incorrect token'});
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) reject({status: 401, message: 'Incorrect token'});
                resolve(decoded);
            });
        })
            .then(decoded => {
                const username = decoded.data;
                // todo -> fetch token and set to req user
                next();
            })
            .catch(err => {
                res.status(err.status);
                res.json({
                    data: err.message,
                });
            });
    };
}

function login() {

}

module.exports = {
    authenticate,
};