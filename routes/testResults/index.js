const express = require('express');
const router = express.Router();

const testResultsService = require('../../services/testResults');

router.get('/:userId', (req, res, next) => {
    testResultsService.getAllByUserId(req.params.userId)
        .then(data => {
            res.json({
                data: data
            });
        });
});

router.get('/:userId/:testId', (req, res, next) => {
   testResultsService.getAllByUserIdTestId(req.params.userId, req.params.testId)
       .then(data => {
           res.json({
               data: data
           });
       });
});

router.post('/', (req, res, next) => {
   testResultsService.create(req.body)
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
