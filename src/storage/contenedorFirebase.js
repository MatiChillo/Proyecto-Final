import firebaseDB from "../services/firebase/config.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";

class ContainerFirebase {

    constructor( collectionName ) {

        this.db = firebaseDB;
        this.collection = collection( this.db, collectionName );

    }

    async save ( object ) {

        object.timestamp = new Date() / 1000;

        const newItem = await addDoc( this.collection, object );

        return { id: newItem.id, ...object };

    }

    async getAll () {

        try {

            const data = await getDocs( this.collection );

            const products = [];

            data.forEach( element => {

                products.push( { id: element.id, ...element.data() } );

            } );

            return {

                success: true,
                products

            };

        } catch (error) {
            
            console.log(error);

        }

    }

    async getById ( id ) {
      
        try {

            const document = doc( this.collection, id );

            const product = await getDoc( document );

            if ( product.data() != null ) {

                return { id, ...product.data() };
    
            } else {

                return null;

            }

        } catch (error) {
            
            console.log(error);

        }

    }

    async putById( id, change ) {

        try {

            const item = await this.getById( id );

            const document = doc( this.collection, id );

            await updateDoc( document, change );

            return { ...item, ...change };

        } catch (error) {
            
            console.log(error);

        }

    }

    async deleteById( id ) {

        try {

            const item = await this.getById( id );

            if ( item ) {

                const document = doc( this.collection, id );

                await deleteDoc( document );

                return `The item ${id} was deleted seccessfully`;

            } else {

                return null;

            }

        } catch (error) {
            
            console.log(error);

        }

    }

    async deleteAll() {

        const document = doc( this.collection );

        await deleteDoc( document );

    }

}

export default ContainerFirebase;
