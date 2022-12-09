import fs from 'fs';

import { ProductService } from '../daos/index.js';

class ContainerFile {

    constructor ( archivo ) {

        this.archivo = archivo;

    }

    async save( object ) {

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

            return object;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async getById( id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            const objectToFind = dataToJson.find(element => 
    
                element.id == id
              
            );

            if ( objectToFind != undefined ) {

                return objectToFind;

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

            const productService = await ProductService();

            let get = await productService.getById( id );

            if ( get ) {

                get = {

                    ...get,
                    ...change

                };

                data = data.map( element => {

                    if ( element.id == get.id ) {

                        element = get;

                    }

                    return element;

                });

                data = JSON.stringify( data, null, 2 );

                await fs.promises.writeFile( `./${this.archivo}`, data );

                return get;

            } else {

                return null;
            
            }

        } catch ( error ) {

            console.error( error );

        }



    }

    async deleteById( id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let get = dataToJson.find( element => element.id == id );

            if ( get ) {

                const objectToFind = dataToJson.filter(element => 
            
                    element.id != id
                    
                );

                await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( objectToFind, null, 2 ) );

                return objectToFind;

            } else {

                return null;

            }     
        
        } catch ( error ) {

            console.error( error );

        }

    }

    async deleteAll() {

        await fs.promises.writeFile( `./${this.archivo}`, "[]" );

    }

}

export default ContainerFile;