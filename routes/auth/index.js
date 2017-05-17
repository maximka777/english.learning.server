const express = require('express');
const router = express.Router();

const authService = require('../../services/auth');

router.post('/login', (req, res, next) => {
    const username = req.body.username || null;
    const password = req.body.password || null;
    authService.login(username, password)
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
    const auth_headers = req.headers.authorization;
    if(!auth_headers) {
        res.status(401);
        return res.json({
            data: 'No authorization header'
        })
    }
    authService.logout(auth_headers)
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