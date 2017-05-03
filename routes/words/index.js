const express = require('express');
const router = express.Router();

const wordsService = require('../../services/words');

router.get('/', (req, res, next) => {
    wordsService.getAll()
        .then(data => {
            res.json({
                data: data
            });
        });
});

router.get('/:topicId', (req, res, next) => {
   wordsService.getAllByTopicId(req.params.topicId)
       .then(data => {
           res.json({
               data: data
           })
       })
});

router.post('/', (req, res, next) => {
    wordsService.create(req.body)
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
        })
});

router.delete('/:id', (req, res, next) => {
    wordsService.remove(req.params.id)
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
