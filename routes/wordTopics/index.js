const express = require('express');
const router = express.Router();

const wordTopicsService = require('../../services/wordTopics');

router.get('/', (req, res, next) => {
    wordTopicsService.getAll()
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
   wordTopicsService.create(req.body)
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
    const id = req.params.id;
    if(!id) {
        res.status(400);
        return res.json({
            data: 'Incorrect word topic'
        });
    }
    wordTopicsService.remove(id)
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

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if(!id) {
        res.status(400);
        return res.json({
            data: 'Incorrect word topic'
        });
    }
    wordTopicsService.getOne(id)
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
