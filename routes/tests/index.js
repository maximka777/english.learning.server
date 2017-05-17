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
    const topicId = req.params.topicId || null;
    if(!(topicId && topicId > 0)) {
        res.status(400);
        return res.json({
            data: 'Incorrect topic'
        })
    }
    testsService.getAllByTopicId(req.params.topicId)
        .then(data => {
            res.json({
                data: data
            });
        })
});

router.get('/:testId', (req, res, next) => {
    const testId = req.params.testId || null;
    if(!(testId && testId > 0)) {
        res.status(400);
        return res.json({
            data: 'Incorrect test'
        })
    }
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
    const testId = req.pparams.id || null;
    if(!(testId && (testId > 0))) {
        res.status(400);
        return res.json({
            data: 'Incorrect test'
        })
    }
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