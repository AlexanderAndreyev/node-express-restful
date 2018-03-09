const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
