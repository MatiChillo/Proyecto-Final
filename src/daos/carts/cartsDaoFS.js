import fs from 'fs';

import ContainerFile from "../../storage/contenedorArchivo.js";

class CartClass extends ContainerFile {

    constructor() {

        super( './src/storage/carritos.txt' );

    }

    async saveProduct( object, id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let cart = dataToJson.find( element => element.id == id );
            
            if ( cart ) {

                if ( cart.productos == undefined ) {

                    cart.productos = [];

                } 

            } else {

                return null;

            }

            cart.productos.push( object );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( dataToJson, null, 2 ) );

            return object;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async deleteByTwoIds( id, prod_id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let cart = dataToJson.find( element => element.id == id );

            let otherCarts = dataToJson.find( element => element.id != id );

            if ( cart ) {

                const objectToFind = cart.productos.filter(element => 
            
                    element.id != prod_id
                    
                );

                const productToFind = cart.productos.filter(element => 
            
                    element.id == prod_id
                    
                );

                if ( objectToFind && productToFind.length > 0 ) {

                    let array = [];

                    cart.productos = objectToFind;

                    if ( otherCarts ) {

                        array.push( cart, otherCarts );

                    } else {

                        array.push( cart );

                    }

                    await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( array, null, 2 ) );

                    return cart;
            
                } else {

                    return null;

                }

            } else {

                return null;

            }

        } catch ( error ) {

            console.log(error);

        }

    }

}

export default CartClass;