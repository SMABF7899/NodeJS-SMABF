const express = require('express');
const router = express.Router();
const homeController = require('app/http/controllers/homeController');
// Home Route
router.get('/', homeController.index)

module.exports = router