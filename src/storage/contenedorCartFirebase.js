import cartModel  from "../services/mongo/models/cart.model.js";

class CartService {

    constructor() {}

    async saveCart ( object ) {

        const newCart = new cartModel( object );

        return await newCart.save();

    }

    async saveProduct ( object, id ) {

        const product = await cartModel.updateOne(

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

    async getAll( page = 0, limit = 200 ) {

        if ( limit > 200 ) {

            limit = 200;

        }

        page = parseInt( page );

        limit = parseInt( limit );

        const offset = page * limit;

        try {

            const data = await cartModel.find().skip( offset ).limit( limit);

            const totalCount = await cartModel.estimatedDocumentCount();

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

            const cart = await cartModel.findOne( { _id: id } );

            if ( cart != null ) {

                return cart;
    
            } else {

                return null;

            }

        } catch (error) {
            
            console.log(error);

        }

    }

    async putById( id, change ) {

        try {

            const dataUpdated = await cartModel.updateOne(

                { _id: id },
                { $set: change }

            );

            if ( dataUpdated.matchedCount == 1 || dataUpdated.modifiedCount == 1 ) {

                return {

                    success: true,
                    message: `The cart ${id} was updated seccessfully`

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

        const deletedCart = await cartModel.deleteOne( { _id: id } );

        if ( deletedCart.deletedCount == 1 ) {

            return {

                success: true,
                message: `The cart ${id} was deleted seccessfully`
        
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

    async deleteByTwoIds ( id, prod_id ) {

        const cart = await contCart.getById( { _id: id } );

        const products = cart.productos;

        products.filter( element =>
            
            element._id != prod_id
            
        );

        await cartModel.updateOne(

            { _id: id },
            { $set: { productos: products } }

        );

        return cart;

    }

    async deleteAll() {

        await cartModel.deleteMany( {} );

    }

}

const contCart = new CartService();

export default contCart;
