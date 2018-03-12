const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const apiV1 = require('./routes/api/v1');

const passportConfig = require('./config/auth');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi');

passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'somesecretkey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/rest', apiV1);

app.get('/', (req, res) => {
  res.render('layout.pug');
});

app.get('/profile', (req, res) => {
  res.render('profile.pug');
});

// Fully access to gmail provided
app.get('/auth/google', passport.authenticate('google', { scope : ['https://mail.google.com/', 'profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/profile');
  });

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { message: err.message });
});

module.exports = app;
