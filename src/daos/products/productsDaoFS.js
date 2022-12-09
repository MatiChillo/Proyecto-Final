import ContainerFile from "../../storage/contenedorArchivo.js";

class ProductClass extends ContainerFile {

    constructor() {

        super( './src/storage/productos.txt' );

    }

    activateProducts() {

        return [ 

            {

                productName: "FS Products"

            }

        ];

    }

}

export default ProductClass;