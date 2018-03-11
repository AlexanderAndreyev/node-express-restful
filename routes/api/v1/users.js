const express = require('express');
const passport = require('passport');
const UserController = require('../../../controllers/user.controller');

const router = express.Router();
const userController = new UserController();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ errors: { global: "Unauthorized" }});
};

router.post('/login', passport.authenticate('local-login'), userController.login);
router.post('/logout', userController.logout);
router.post('/signup', passport.authenticate('local-signup'), userController.signup);
router.get('/user', isLoggedIn, userController.getUserData);

module.exports = router;
