const express = require('express');
const router = express.Router();
const authenticate = require('../services/auth').authenticate;

router.use(authenticate());

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/testTopics', require('./testTopics'));
router.use('/tests', require('./tests'));

module.exports = router;