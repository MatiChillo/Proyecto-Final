import ContainerMongo from '../../storage/contenedorMongoDB.js';
import { cartSchema, CartModel } from '../../services/mongo/models/cart.model.js';
//import { ProductClass } from '../products/productsDaoMongoDB.js';

class CartClass extends ContainerMongo {

    constructor() {

        super( 'carts', cartSchema );

    }

    async saveProduct ( object, id ) {

        const product = await this.model.updateOne(

            { _id: id },
            { $set: { productos: object } }

        );

        if ( product.matchedCount == 1 || dataUpdated.modifiedCount == 1 ) {

            return {

                success: true,
                message: `The product was inserted in cart seccessfully`

            };

        } else {

            return {

                success: false,
                message: "Error inserting product"

            };
        
        }

    }

    async deleteByTwoIds ( id, prod_id ) {

        const cart = await super.getById( { _id: id } );

        const products = cart.productos;

        console.log(products)

        products.filter( element =>
            
            element._id != prod_id
            
        );

        console.log(products)

        await this.model.updateOne(

            { _id: id },
            { $set: { productos: products } }

        );

        return cart;

    }

}

export default CartClass;