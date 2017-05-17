const express = require('express');
const router = express.Router();

const testQuestionsService = require('../../services/testQuestions');

router.get('/:testId', (req, res, next) => {
    const testId = req.params.testId || null;
    if(!(testId && testId > 0)) {
        res.status(400);
        return res.json({
            data: 'Incorrect test'
        })
    }
    testQuestionsService.getAllByTestId(testId)
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
    const questionId = req.params.id || null;
    if(!(questionId && (questionId > 0))) {
        res.status(400);
        return res.json({
            data: 'Incorrect question'
        })
    }
    testQuestionsService.remove(questionId)
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