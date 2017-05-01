const express = require('express');
const router = express.Router();

const authService = require('../../services/auth');

router.post('/login', (req, res, next) => {
    authService.login(req.body.username, req.body.password)
        .then(data => {
            res.json({
                data: data
            });
        })
        .catch(err => {
            res.status(err.status);
            res.json({
                data: err.message
            });
        });
});

router.post('/logout', (req, res, next) => {
    authService.logout(req.headers.authorization)
        .then(data => {
            res.json({
                data: data
            });
        })
        .catch(err => {
            res.status(err.status);
            res.json({
                data: err.message
            });
        });
});

module.exports = router;