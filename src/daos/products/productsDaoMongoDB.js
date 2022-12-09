import ContainerMongo from '../../storage/contenedorMongoDB.js';
import { productSchema, ProductModel } from '../../services/mongo/models/product.model.js';

class ProductClass extends contProduct {

    constructor() {

        super( 'products', productSchema );

    }

    activateProducts() {

        return [ 

            {

                productName: "MongoDB Products"

            }
        ];

    }

}

export default ProductClass;