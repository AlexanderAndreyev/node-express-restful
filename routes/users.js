const express = require('express');
const router = express.Router();

const passport = require('passport');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).send('Please login');
};

router.get('/profile', isLoggedIn, (req, res) => {
  res.send('You can see the profile');
});

router.post('/logout', (req, res) => {
  req.logout();
  res.status(201).send('Logged out');
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.send('You are logged in');
});

router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  res.send('You are registered');
});

module.exports = router;
