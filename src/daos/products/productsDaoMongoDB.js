import ContainerMongo from '../../storage/contenedorMongoDB.js';
import { productSchema, ProductModel } from '../../services/mongo/models/product.model.js';

class ProductClass extends ContainerMongo {

    constructor() {

        super( 'products', productSchema );

    }

}

export default ProductClass;