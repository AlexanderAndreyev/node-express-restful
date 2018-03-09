const express = require('express');
const router = express.Router();

const Product = require('../models/product');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ errors: { global: "Unauthorized" }});
};

router.get('/products', isLoggedIn, (req, res) => {
  Product.find({})
    .then(products => res.json(products));
});

router.get('/products/:id', isLoggedIn, (req, res) => {
  Product.findOne({ _id: req.params.id})
    .then(product => res.json(product));
});

router.post('/products', isLoggedIn, (req, res) => {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
});

router.put('/products/:id', isLoggedIn, (req, res) => {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
});


router.delete('/products/:id', isLoggedIn, (req, res) => {
  Product.findByIdAndRemove({ _id: req.params.id })
    .then(product => res.json(product));
});

module.exports = router;
