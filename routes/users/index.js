const express = require('express');
const router = express.Router();

const usersService = require('../../services/users');

router.get('/', (req, res, next) => {
    usersService.getAll()
        .then(data => {
            res.json({
                data: data
            });
        });
});

module.exports = router;