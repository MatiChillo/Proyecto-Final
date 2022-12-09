import contCart from '../../storage/contenedorCartMongoDB.js';

class CartClass extends contCart {

    constructor(){}

    activateCarts() {

        return [ 

            {

                CartName: "MongoDB Carts"

            }
        ];

    }

}

export default CartClass;