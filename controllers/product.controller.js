const Product = require('../models/product');

class ProductController {

  createProduct(req, res) {
    Product
      .create(req.body)
      .then(product => res.json(product))
      .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
  }

  deleteProduct(req, res) {
    Product
      .findByIdAndRemove({ _id: req.params.id })
      .then(product => res.json(product));
  }

  getProducts(req, res) {
    Product
      .find({})
      .then(products => res.json(products));
  }

  getProduct(req, res) {
    Product
      .findOne({ _id: req.params.id })
      .then(product => res.json(product));
  }

  updateProduct(req, res) {
    Product
      .findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(product => res.json(product))
      .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
  }

}

module.exports = ProductController;
