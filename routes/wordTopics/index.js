const express = require('express');
const router = express.Router();

const wordTopicsService = require('../../services/wordTopics');

router.get('/', (req, res, next) => {
    wordTopicsService.getAll()
        .then(data => {
            res.json({
                data: data
            });
        });
});

router.post('/', (req, res, next) => {
   wordTopicsService.create({name: req.body.name})
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

module.exports = router;
