import { Schema, model } from "mongoose";

export const productSchema = new Schema({

    name: 
        {
            type: String,
            required: true,
            unique: true
        },
    description: 
        {
            type: String,
            required: true
        },  
    code: 
        {
            type: Number,
            required: true
        },  
    url: 
        {
            type: String,
            required: true
        },  
    price: 
        {
            type: Number,
            required: true
        }, 
    stock: 
        {
            type: Number,
            required: true
        }, 
    timestamp: 
        {
            type: Number,
            required: true,
            default: parseInt(Date.now() / 1000),
        }

});

export const ProductModel = model( "products", productSchema );
