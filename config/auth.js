const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid/v4');

const User = require('../models/user');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, (req, email, password, done) => {
      if (email) {
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        User.findOne({ email :  email }, (err, user) => {
          if (err)
            return done(err);
          if (!user)
            return done(null, false);
          if (!user.validPassword(password))
            return done(null, false);
          else
            return done(null, user);
        });
      }}));

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    }, (req, email, password, done) => {
      if (email)
        email = email.toLowerCase();
        // if the user is not already logged in:
        if (!req.user) {
          User.findOne({ email: email }, (err, user) => {
            if (err)
              return done(err);
            if (user) {
              return done(null, false);
            } else {
              const newUser = new User();
              newUser.email = email;
              newUser.password = newUser.generateHash(password);
              newUser.uuid = uuid();
              newUser.save((err) => {
                if (err) return done(err);
                return done(null, newUser);
              });
            }

          });
        } else {
          // user is logged in and already has a local account. Ignore signup.
          return done(null, req.user);
        }


    }));

};
