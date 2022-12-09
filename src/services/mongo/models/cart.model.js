import { Schema, model } from "mongoose";

export const cartSchema = new Schema({

    timestamp: 
        {
            type: Number,
            required: true,
            default: parseInt(Date.now() / 1000)
        },
    productos: 
        {
            type: Array,
            required: true
        }

});

export const CartModel = model( "carts", cartSchema );
