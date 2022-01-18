const express = require('express');
const router = express.Router();
const adminController = require('app/http/controllers/admin/indexController')
// Admin Route
router.get('/', adminController.index)

module.exports = router