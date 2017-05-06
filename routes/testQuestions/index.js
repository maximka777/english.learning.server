const express = require('express');
const router = express.Router();

const testQuestionsService = require('../../services/testQuestions');

router.get('/:testId', (req, res, next) => {
    testQuestionsService.getAllByTopicId(req.params.testId)
        .then(data => {
            res.json({
                data: data
            });
        });
});

router.post('/', (req, res, next) => {
    testQuestionsService.create(req.body)
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
    testQuestionsService.remove(req.params.id)
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