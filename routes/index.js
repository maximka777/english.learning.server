const express = require('express');
const router = express.Router();
const authenticate = require('../services/auth').authenticate;

router.use(authenticate());

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/test-topics', require('./testTopics'));
router.use('/tests', require('./tests'));
router.use('/words', require('./words'));
router.use('/word-topics', require('./wordTopics'));
router.use('/test-results', require('./testResults'));
router.use('/test-questions', require('./testQuestions'));

module.exports = router;