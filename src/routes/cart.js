import express from 'express';
const router = express.Router();

//import cont from '../storage/contenedorCartArchivo.js';
//import contProduct from '../storage/contenedorArchivo.js';

router.get('/:id/productos', async (req, res, next) => {

    try {

        const id = req.params.id;

        const cart = await cont.getById( id );

        if ( cart ) {

            res.status(200).json( { products: cart } );
            
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

        const saveCart = await cont.saveCart( cart );
        
        res.status(200).json( { id: saveCart } );

    } catch (error) {
        
        next( error );

    }

});

router.post('/:id/productos/:id_prod', async (req, res, next) => {

    try {

        const id = req.params.id;

        const id_prod = req.params.id_prod;

        const product = await contProduct.getById( id_prod );

        if ( product ) {

            const saveProduct = await cont.saveProduct( product, id );
        
            res.status(200).json( { saveProduct } );
            
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

        const deleteCart = await cont.deleteById( id );

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

        const deleteProduct = await cont.deleteByTwoIds( id, id_prod );

        if ( deleteProduct ) {

            res.status(200).json({

                cart: deleteProduct
    
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

export default router;