const express = require('express');
const router = express.Router();

const passport = require('passport');

router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(201);
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.send('You are logged in');
});

router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  res.send('You are registered');
});

module.exports = router;
