import ContainerMongo from '../../storage/contenedorMongoDB.js';
import { cartSchema, CartModel } from '../../services/mongo/models/cart.model.js';

class CartClass extends ContainerMongo {

    constructor() {

        super( 'carts', cartSchema );

    }

    async saveProduct ( object, id ) {

        const cart = await super.getById( id );

        let product;

        if ( cart ) {

            cart.productos.push( object );

            product = await this.model.updateOne(

                { _id: id },
                { $set: { productos: cart.productos } }

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

    }

    async deleteByTwoIds ( id, prod_id ) {

        const cart = await super.getById( id );

        if ( cart ) {

            const products = cart.productos;

            const filter = products.filter( element =>
            
                element._id != prod_id
                
            );

            if ( products.length == filter.length ) {

                return null;

            }

            await this.model.updateOne(

                { _id: id },
                { $set: { productos: filter } }
    
            );
    
            return filter;

        }        

    }

}

export default CartClass;