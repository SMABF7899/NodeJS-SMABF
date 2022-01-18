const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const homeRouter = require('./home');
const apiRouter = require('../api');

router.use('/admin', adminRouter);
router.use('/', homeRouter);
router.use('/api', apiRouter);

module.exports = router