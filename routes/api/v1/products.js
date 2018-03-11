const express = require('express');
const router = express.Router();

const ProductController = require('../../../controllers/product.controller');
const productController = new ProductController();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ errors: { global: "Unauthorized" }});
};

router.get('/products', isLoggedIn, productController.getProducts);
router.get('/products/:id', isLoggedIn, productController.getProduct);
router.post('/products', isLoggedIn, productController.createProduct);
router.put('/products/:id', isLoggedIn, productController.updateProduct);
router.delete('/products/:id', isLoggedIn, productController.deleteProduct);

module.exports = router;
