const express = require('express');
const router = express.Router();
const { AuthController } = require('../controller/index');
const { AuthMiddleware } = require('../middleware/index');


router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/profile', AuthMiddleware.validateUser, AuthController.UserProfile);

module.exports = router;