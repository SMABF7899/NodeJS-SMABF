const express = require('express');
const router = express.Router();
const homeController = require('app/http/controllers/homeController');
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
// Home Route
router.get('/', homeController.index);
router.get('/login', loginController.showLoginForm);
router.get('/register', registerController.showRegisterForm);

module.exports = router