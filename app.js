require("dotenv").config();
const express =  require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//specifying port
const port = process.env.PORT || 2000;

//setting connection b/w node and database
mongoose
    .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.3fngu.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
    .then(() =>{
        console.log("Connected to Databse!");
    
        //setting listening port
        app.listen(port, () => {
            console.log(`Server Running on Port ${port}`);
        });
    })
    .catch((err) =>{
        console.log(err);
    });
    
    
//middlewares
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(bodyParser.json());



//importing routes
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const productRoutes = require('./routes/product.routes');
const wishlistRoutes = require('./routes/wishlist.routes');

//routes
app.use(userRoutes);
app.use(orderRoutes);
app.use(productRoutes);
app.use(wishlistRoutes);


