const express = require('express');
const router = express.Router();

const testResultsService = require('../../services/testResults');

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId || null;
    if(!(userId && (userId > 0))) {
        res.status(400);
        return res.json({
            data: 'Incorrect user'
        })
    }
    testResultsService.getAllByUserId(userId)
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

router.get('/:userId/:testId', (req, res, next) => {
   const userId = req.params.userId || null;
   const testId = req.params.testId || null;
   if(!(userId && (userId > 0) && testId && (testId > 0))){
       res.status(400);
       return res.json({
           data: 'Incorrect request data'
       })
   }
   testResultsService.getAllByUserIdTestId(userId, testId)
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
       });;
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
