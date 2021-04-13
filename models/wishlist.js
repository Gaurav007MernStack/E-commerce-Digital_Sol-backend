const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//creating wishlist schema
const wishlistSchema = new Schema({
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

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;