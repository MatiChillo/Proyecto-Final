import dotenv from "dotenv";
dotenv.config();

const getProductModule = async () => {

    const dataCore = process.env.DATACORE;

    if ( dataCore == 'FS' ) {

        const ModuleSource = await import('../daos/products/productsDaoFS.js');

        return ModuleSource.default;

    } else if ( dataCore == 'Firebase' ) {

        const ModuleSource = await import('../daos/products/productsDaoFirebase.js');

        return ModuleSource.default;

    } else if ( dataCore == 'MongoDB' ) {

        const ModuleSource = await import('../daos/products/productsDaoMongoDB.js');

        return ModuleSource.default;

    }

};

const ProductService = async () => {

    const ProductClass = await getProductModule();

    const productService = new ProductClass();

    return productService;

};


const getCartModule = async () => {

    const dataCore = process.env.DATACORE;

    if ( dataCore == 'FS' ) {

        const ModuleSource = await import('../daos/carts/cartsDaoFS.js');

        return ModuleSource.default;

    } else if ( dataCore == 'Firebase' ) {

        const ModuleSource = await import('../daos/carts/cartsDaoFirebase.js');

        return ModuleSource.default;

    } else if ( dataCore == 'MongoDB' ) {

        const ModuleSource = await import('../daos/carts/cartsDaoMongoDB.js');

        return ModuleSource.default;

    }

};

const CartService = async () => {

    const CartClass = await getProductModule();

    const cartService = new CartClass();

    return cartService;

};

export { ProductService, CartService };