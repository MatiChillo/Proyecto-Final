import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => console.info( `Server up and listen on port ${PORT}` ) );