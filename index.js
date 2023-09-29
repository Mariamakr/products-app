//This app requires a base coding factory to mongodb from previous lessons
const express = require('express');
const app = express();
const port = 3000;


const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); //gia .env


const user = require('./routes/user.route');
//const product = require('./routes/product.route');
//pos tha diaxeiristo tis kleiseis mesa se autous tous fakelous routes tous opoious tous eftiaksa gia na einai dithen pio mazemeno??
const user_products = require('./routes/user-product.route');

mongoose.connect(process.env.MONGODB_URI)
 .then(
    () => {console.log("Connection with database")},
    err => {console.log("Failed to connect to MongoDB", err)}
 );
  //that means if everything works to the connection and say first message else print the error message...


 app.use(cors({
    //origin: '*',
    origin: ['https://www.example.com', 'http://localhost:8001']
 }))


//  app.get('/users', user); //antlei stoixeia kai ta emfanizei
//  app.post('/users', product);//apothikeyei ta stoixeia


//  app.get('./products',...) //an to kano ayto gia ola tha ginei olo ena makrinari 
//  //GIAUTO XRISIMOPOIO MONOMIAS TO APP.USE
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');


 app.use('/api/users', user);

 //app.use('/api/products', product);
 app.use('/api/user-products', user_products);

 app.use('/api-docs',
 swaggerUI.serve,
 swaggerUI.setup(swaggerDocument.options))

app.use('/', express.static('files'));


app.listen(port, ()=>{
    console.log("Listening on port 3000");
});



