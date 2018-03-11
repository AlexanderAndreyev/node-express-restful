const express = require('express');
const router = express.Router();

const users = require('./users');
const products = require('./products');

router.use('/v1', users, products);

module.exports = router;
