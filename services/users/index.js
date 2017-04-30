const User = require('../../database/models/users');

function getAll() {
    return User.findAll();
}

module.exports = {
    getAll,
};
