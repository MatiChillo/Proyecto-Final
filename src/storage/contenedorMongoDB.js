import mongoose from "mongoose";

class ContainerMongo {

    constructor( collection, schema ) {

        this.model = mongoose.model( collection, schema );

    }

    async save ( object ) {

        const newItem = await this.model.create( object );

        return newItem;

    }

    async getAll( page = 0, limit = 200 ) {

        if ( limit > 200 ) {

            limit = 200;

        }

        page = parseInt( page );

        limit = parseInt( limit );

        const offset = page * limit;

        try {

            const data = await this.model.find().skip( offset ).limit( limit);

            const totalCount = await this.model.estimatedDocumentCount();

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

            const data = await this.model.findOne( { _id: id } );

            if ( data != null ) {

                return data;
    
            } else {

                return null;

            }

        } catch (error) {
            
            console.log(error);

        }

    }

    async putById( id, change ) {

        try {

            const dataUpdated = await this.model.updateOne(

                { _id: id },
                { $set: change }

            );

            if ( dataUpdated.matchedCount == 1 || dataUpdated.modifiedCount == 1 ) {

                return {

                    success: true,
                    message: `The item ${id} was updated seccessfully`

                };

            } else {

                return {

                    success: false,
                    message: "Error updating item"

                };
            
            }

        } catch (error) {
            
            console.log(error);

        }

    }

    async deleteById( id ) {

        try {

        const deletedItem = await this.model.deleteOne( { _id: id } );

        if ( deletedItem.deletedCount == 1 ) {

            return {

                success: true,
                message: `The item ${id} was deleted seccessfully`
        
            };

        } else {

            return {

                success: false,
                message: "Error deleting item"

            };

        }

        } catch (error) {
            
            console.log(error);

        }

    }

    async deleteAll() {

        await this.model.deleteMany( {} );

    }

}

export default ContainerMongo;
