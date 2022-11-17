const router = require('express').Router();

const products = require('./products');
const cart = require('./cart');

router.use('/productos', products);
router.use('/carrito', cart);

module.exports = router;