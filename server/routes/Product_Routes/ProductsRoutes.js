const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../../middlewares/Auth');
const { addProduct, getProducts } = require('../../controller/Product_Controller/productController');

router.route("/")
  .get(ensureAuthenticated, getProducts)
  .post(ensureAuthenticated, addProduct);

module.exports = { router };
