import ContainerFile from "../../storage/contenedorArchivo.js";

class ProductClass extends ContainerFile {

    constructor() {

        super( './src/storage/productos.txt' );

    }

}

export default ProductClass;