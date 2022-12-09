import express from 'express';
const router = express.Router();

import { ProductService, CartService } from '../daos/index.js';


router.get('/:id/productos', async (req, res, next) => {

    try {

        const id = req.params.id;

        const cartService = await CartService();

        const cart = await cartService.getById( id );

        if ( cart ) {

            res.status(200).json( { carts: cart } );
            
        } else {

            res.status(500).json({

                success: false,
                error: "carrito no encontrado"

            });

        }

    } catch (error) {
        
        next( error );

    }

});

router.post('/', async (req, res, next) => {

    try {

        const cart = req.body;

        const cartService = await CartService();

        const saveCart = await cartService.save( cart );
        
        res.status(200).json( { id: saveCart } );

    } catch (error) {
        
        next( error );

    }

});

router.post('/:id/productos/:id_prod', async (req, res, next) => {

    try {

        const id = req.params.id;

        const id_prod = req.params.id_prod;

        const cartService = await CartService();

        const productService = await ProductService();

        const product = await productService.getById( id_prod );

        if ( product ) {

            const saveProduct = await cartService.saveProduct( product, id );

            if ( saveProduct ) {

                res.status(200).json( { saveProduct } );

            } else {

                res.status(500).json({

                    success: false,
                    error: "carrito no encontrado"
    
                });

            }
        
        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }

    } catch (error) {
        
        next( error );

    }

});

router.delete('/:id', async (req, res, next) => {

    try {
        
        const id = req.params.id;

        const cartService = await CartService();

        const deleteCart = await cartService.deleteById( id );

        if ( deleteCart ) {

            res.status(200).json({

                carts: deleteCart
    
            });

        } else {

            res.status(500).json({

                success: false,
                error: "producto no encontrado"

            });

        }       

    } catch (error) {
        
        next( error );

    }

});

router.delete('/:id/productos/:id_prod', async (req, res, next) => {

    try {
        
        const id = req.params.id;

        const id_prod = req.params.id_prod;

        const cartService = await CartService();

        const deleteProduct = await cartService.deleteByTwoIds( id, id_prod );

        if ( deleteProduct ) {

            res.status(200).json({

                cart: deleteProduct
    
            });

        } else {

            res.status(500).json({

                success: false,
                error: "carrito o producto no encontrado"

            });

        }       

    } catch (error) {
        
        next( error );

    }

});

export default router;