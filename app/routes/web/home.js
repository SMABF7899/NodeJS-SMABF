const express = require('express');
const router = express.Router();
const homeController = require('app/http/controllers/homeController');
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');
// Home Route
router.get('/', homeController.index);
router.get('/login', redirectIfAuthenticated.handle, loginController.showLoginForm);
router.post('/login', redirectIfAuthenticated.handle, loginValidator.handle(), loginController.loginProcess);
router.get('/register', redirectIfAuthenticated.handle, registerController.showRegisterForm);
router.post('/register', redirectIfAuthenticated.handle, registerValidator.handle(), registerController.registerProcess);
router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/')
});

module.exports = router