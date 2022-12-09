import express from 'express';
const router = express.Router();

import products from './products.js';
import cart from './cart.js';

router.use('/productos', products);
router.use('/carrito', cart);

export default router;