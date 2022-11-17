const router = require('express').Router();

const cont = require('../storage/products');

router.get('/:id', async (req, res, next) => {

    try {

        const id = req.params.id;

        const oneProduct = await cont.getById( id );

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

        const saveProduct = await cont.save( product );
        
        res.status(200).json( { saveProduct } );

    } catch (error) {
        
        next( error );

    }

});


router.put('/:id', async (req, res, next) => {

    try {

        const id = req.params.id;
        
        const change = req.body;

        const updating = await cont.putById( id, change );

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

        const deleteProduct = await cont.deleteById( id );

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

module.exports = router;