const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validation');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
//router.get('/me', requireAuth, getCurrentUser); // If you have this route

module.exports = router; // Must export the router