import {  } from "../services/firebase/config.js";

class ProductService {

    constructor() {}

    async save ( object ) {

        const newProduct = new productModel( object );

        return await newProduct.save();

    }

    async getAll( page = 0, limit = 200 ) {

        if ( limit > 200 ) {

            limit = 200;

        }

        page = parseInt( page );

        limit = parseInt( limit );

        const offset = page * limit;

        try {

            const data = await productModel.find().skip( offset ).limit( limit);

            const totalCount = await productModel.estimatedDocumentCount();

            return {

                success: true,
                data,
                page,
                limit,
                count: data.length,
                totalCount

            };

        } catch (error) {
            
            console.log(error);

        }

    }

    async getById ( id ) {
      
        try {

            const product = await productModel.findOne( { _id: id } );

            if ( product != null ) {

                return product;
    
            } else {

                return null;

            }

        } catch (error) {
            
            console.log(error);

        }

    }

    async putById( id, change ) {

        try {

            const dataUpdated = await productModel.updateOne(

                { _id: id },
                { $set: change }

            );

            if ( dataUpdated.matchedCount == 1 || dataUpdated.modifiedCount == 1 ) {

                return {

                    success: true,
                    message: `The product ${id} was updated seccessfully`

                };

            } else {

                return {

                    success: false,
                    message: "Error updating product"

                };
            
            }

        } catch (error) {
            
            console.log(error);

        }

    }

    async deleteById( id ) {

        try {

        const deletedProduct = await productModel.deleteOne( { _id: id } );

        if ( deletedProduct.deletedCount == 1 ) {

            return {

                success: true,
                message: `The product ${id} was deleted seccessfully`
        
            };

        } else {

            return {

                success: false,
                message: "Error deleting product"

            };

        }

        } catch (error) {
            
            console.log(error);

        }

    }

    async deleteAll() {

        await productModel.deleteMany( {} );

    }

}

const contProduct = new ProductService();

export default contProduct;
