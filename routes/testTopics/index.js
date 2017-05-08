const express = require('express');
const router = express.Router();

const testTopicsService = require('../../services/testTopics');

router.get('/', (req, res, next) => {
    testTopicsService.getAll()
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

router.get('/:topicId', (req, res, next) => {
    testTopicsService.getOne(req.params.topicId)
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

router.post('/', (req, res, next) => {
    testTopicsService.create(req.body)
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
    const id = req.params.id;
    testTopicsService.remove(id)
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