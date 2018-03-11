class UserController {

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
