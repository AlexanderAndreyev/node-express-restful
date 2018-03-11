const User = require('../models/user');

class UserController {

  getUserData(req, res) {
    User
      .findOne({ _id: req.session.passport.user }, { password: 0, _id: 0 })
      .then(users => res.json(users));  }

  login(req, res) {
    res.send('You are logged in');
  }

  logout(req, res) {
    req.logout();
    res.sendStatus(201);
  }

  signup(req, res) {
    res.send('You are registered');
  }

}

module.exports = UserController;
