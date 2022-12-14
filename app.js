import express from "express";

import dotenv from "dotenv";
dotenv.config();

import router from './src/routes/index.js';

import errorHandler from './src/middleware/errorHandler.js';

import mongoConnect from './src/services/mongo/config/connect.js';

import firebaseDB from "./src/services/firebase/config.js";

const app = express();

//mongoConnect();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', router);

app.use( errorHandler );

app.use( ( req, res, _next ) => {

    res.status(404).json( { 
            
        error: -2,
        description: `ruta ${ req.url } y método ${ req.method } no implementados`

    } );

} );

export default app;