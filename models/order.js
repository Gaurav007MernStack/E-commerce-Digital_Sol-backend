const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//creating order schema
const orderSchema = new Schema({
    Products: [
        { 
            type: Schema.Types.ObjectId , 
            ref: 'Product' 
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;