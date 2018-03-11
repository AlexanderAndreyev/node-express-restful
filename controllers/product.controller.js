const uuid = require('uuid/v4');
const Product = require('../models/product');

class ProductController {

  createProduct(req, res) {
    const newProduct = { ...req.body, uuid: uuid() };
    Product
      .create(newProduct)
      .then(product => res.json(product))
      .catch(err => res.status(500).json({ errors: { global: err.message }}));
  }

  deleteProduct(req, res) {
    Product
      .findByIdAndRemove({ uuid: req.params.uuid }, { _id: 0 })
      .then(product => res.json(product));
  }

  getProducts(req, res) {
    Product
      .find({}, { _id: 0 })
      .then(products => res.json(products));
  }

  getProduct(req, res) {
    Product
      .findOne({ uuid: req.params.uuid }, { _id: 0 })
      .then(product => res.json(product));
  }

  updateProduct(req, res) {
    Product
      .findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true })
      .then(product => res.json(product))
      .catch(err => res.status(500).json({ errors: { global: err.message }}));
  }

}

module.exports = ProductController;
