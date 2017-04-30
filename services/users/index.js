const User = require('../../database/models/users');
const Token = require('../../database/models/tokens');

function getAll() {
    return User.findAll();
}

module.exports = {
    getAll,
};
