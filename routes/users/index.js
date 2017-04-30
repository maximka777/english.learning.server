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

router.post('/', (req, res, next) => {
    usersService.create(req.body)
        .then(data => {
            res.json({
                data: data
            });
        });
});

module.exports = router;