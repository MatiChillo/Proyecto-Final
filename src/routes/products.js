import express from 'express';
const router = express.Router();

import { ProductService } from '../daos/index.js';


router.get('/:id', async (req, res, next) => {

    try {

        const id = req.params.id;

        const productService = await ProductService();

        const oneProduct = await productService.getById( id );

        if ( oneProduct ) {

            res.status(200).send( oneProduct );
            
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

router.post('/', async (req, res, next) => {

    try {

        const product = req.body;

        const productService = await ProductService();

        const saveProduct = await productService.save( product );
        
        res.status(200).json( { saveProduct } );

    } catch (error) {
        
        next( error );

    }

});


router.put('/:id', async (req, res, next) => {

    try {

        const id = req.params.id;
        
        const change = req.body;

        const productService = await ProductService();

        const updating = await productService.putById( id, change );

        if ( updating ) {

            res.status(200).json({

                update: updating
    
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

router.delete('/:id', async (req, res, next) => {

    try {
        
        const id = req.params.id;

        const productService = await ProductService();

        const deleteProduct = await productService.deleteById( id );

        if ( deleteProduct ) {

            res.status(200).json({

                products: deleteProduct
    
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