import { doc, updateDoc } from "firebase/firestore";
import ContainerFirebase from "../../storage/contenedorFirebase.js";

class CartClass extends ContainerFirebase {

    constructor() {

        super( 'carts' );

    }

    async saveProduct ( object, id ) {

        try {

            const cart = await super.getById( id );

            if ( cart != null ) {

                cart.productos.push( object );

                const document = doc( this.collection, id );

                await updateDoc( document, { productos: cart.productos } );

                return { ...cart };

            } else {

            return null;

            }

        } catch ( error ) {

            console.error( error );

        }

    }

    async deleteByTwoIds ( id, prod_id ) {

        try {

            const cart = await super.getById( id );

            if ( cart != null ) {

                const products = cart.productos;

                const filter = products.filter( element =>
                
                    element.id != prod_id
                    
                );

                if ( products.length == filter.length ) {

                    return null;
    
                }

                const document = doc( this.collection, id );

                await updateDoc( document, { productos: filter } );
        
                return cart;

            } else {

                return null;            
    
            }
        
        } catch ( error ) {

            console.error( error );

        }

    }

}

export default CartClass;