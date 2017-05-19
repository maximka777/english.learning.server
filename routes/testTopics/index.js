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
    const topicId = req.params.topicId || null;
    if(!topicId) {
        res.status(400);
        return res.json({
           data: 'Incorrect test topic'
        });
    }
    testTopicsService.getOne(topicId)
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
    if(!id) {
        res.status(400);
        return res.json({
            data: 'Incorrect topic'
        })
    }
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

router.put('/:id/theory', (req, res, next) => {
    const id = req.params.id || null;
    const theory = req.body.theory || null;
    if(!(id && theory)) {
        res.status(400);
        return res.json({
            data: 'Incorrect test topic data'
        });
    }
    testTopicsService.updateTheory(id, theory)
        .then(data => {
            res.json({
                data: data
            })
        })
        .catch(err => {
            res.status(err.status);
            res.json({
                data: err.message
            })
        })
});

module.exports = router;