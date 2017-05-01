const express = require('express');
const router = express.Router();

const wordsService = require('../../services/words');

router.get('/', (req, res, next) => {
    wordsService.getAll()
        .then(data => {
            res.json({
                words: data
            })
        })
});

router.post('/', (req, res, next) => {
    wordsService.create(req.word)
        .then(data => {
            res.json({
                word: data
            })
        })
});

module.exports = router;
