const express = require('express');
const router = express.Router();

const testsService = require('../../services/tests');

router.get('/', (req, res, next) => {
    testsService.getAll()
        .then(data => {
            res.json({
                data: data
            });
        });
});

router.get('/theme/:topicId', (req, res, next) => {
    testsService.getAllByTopicId(req.params.topicId)
        .then(data => {
            res.json({
                data: data
            });
        });
});

router.get('/:testId', (req, res, next) => {
    testsService.getOne(req.params.testId)
        .then(data => {
            res.json({
                data: data
            });
        });
});

router.post('/', (req, res, next) => {
    testsService.create(req.body)
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

router.delete('/:id', (req, res, next) => {
    testsService.remove(req.params.id)
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