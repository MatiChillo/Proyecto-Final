const fs = require('fs');

class Contenedor {

    constructor ( archivo ) {

        this.archivo = archivo;

    }

    async saveCart( object ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let lastId;

            if ( dataToJson != "" ) {

                lastId = dataToJson[ dataToJson.length - 1 ].id;

            } else { 

                lastId = 0;

            }

            object.id = lastId + 1;

            object.timestamp = new Date() / 1000;

            dataToJson.push( object );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( dataToJson, null, 2 ) );

            return object.id;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async saveProduct( object, id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let cart = dataToJson.find( element => element.id == id ); 

            if ( cart.productos == undefined ) {

                cart.productos = [];

            } 

            cart.productos.push( object );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( dataToJson, null, 2 ) );

            return object;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async getById( id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            const objectToFind = dataToJson.find(element => {
    
                return element.id == id;
              
            });

            if ( objectToFind != undefined ) {

                return objectToFind.productos;

            } else {

                return null;

            }
            
        } catch (error) {
            
            console.log(error);

        }

    }

    async getAll() {

        let array = [];

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            dataToJson.forEach(element => {
                
                array.push( element );

            });

            return array;
            
        } catch (error) {
            
            console.log(error);

        }

    }

    async putById( id, change ) {

        try {

            let data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            data = JSON.parse( data );

            let product = await cont.getById( id );

            if ( product ) {

                product = {

                    ...product,
                    ...change

                };

                data = data.map( prod => {

                    if ( prod.id == product.id ) {

                        prod = product;

                    }

                    return prod;

                });

                data = JSON.stringify( data, null, 2 );

                await fs.promises.writeFile( `./${this.archivo}`, data );

                return product;

            } else {

                return null;
            
            }
        
        } catch ( error ) {

            console.log(error);

        }

    }

    async deleteById( id ) {
        
        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let product = dataToJson.find( prod => prod.id == id );

            if ( product ) {

                const objectToFind = dataToJson.filter(element => 
            
                    element.id != id
                    
                );

                await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( objectToFind, null, 2 ) );

                return objectToFind;

            } else {

                return null;

            }
        
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

                    array.push( cart, otherCarts );

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

    async deleteAll() {

        await fs.promises.writeFile( `./${this.archivo}`, "[]" );

    }

}

const cont = new Contenedor( './src/storage/carritos.txt' );

module.exports = cont;