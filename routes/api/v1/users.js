const express = require('express');
const passport = require('passport');
const UserController = require('../../../controllers/user.controller');

const router = express.Router();
const userController = new UserController();

router.post('/login', passport.authenticate('local-login'), userController.login);
router.post('/logout', userController.logout);
router.post('/signup', passport.authenticate('local-signup'), userController.signup);

module.exports = router;
