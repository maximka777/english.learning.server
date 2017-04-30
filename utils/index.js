const md5 = require('js-md5');
const moment = require('moment');

function _md5(data) {
    return md5(data);
}

module.exports = {
    md5: _md5,
};