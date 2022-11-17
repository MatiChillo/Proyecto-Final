const express = require("express");
require("dotenv").config();

const router = require('./src/routes/index');

const errorHandler = require('./src/middleware/errorHandler');

const app = express();

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

module.exports = app;