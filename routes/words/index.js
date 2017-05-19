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
   const topicId = req.params.topicId || null;
   if(!topicId) {
       res.status(400);
       return res.json({
           data: 'Incorrect topic'
       });
   }
   wordsService.getAllByTopicId(topicId)
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
    const topicId = req.params.id || null;
    if(!topicId) {
        res.status(400);
        return res.json({
            data: 'Incorrect topic'
        });
    }
    wordsService.remove(topicId)
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
