const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
