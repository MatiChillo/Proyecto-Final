import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

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

export default mongoose.model( "cart", cartSchema );
