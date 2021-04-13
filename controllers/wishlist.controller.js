const Order = require('../models/wishlist');
const Product = require('../models/product');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

const addWishlist = async(req,res) => {
    const { productId } = req.query;
    console.log(productId)
    const user = req.user; //accessing user from authorization
    const _id = user._id;
    //const firstName = user.firstName;
    //console.log(firstName)
    try {
        const wishlist = new Wishlist({ Products: productId, owner: { _id } });
        console.log(wishlist)
        await wishlist.save((error, wishlist) => {
            if(error) return res.status(400).json({ error });  
            if(wishlist){
                res.status(201).json({ wishlist });
            }
        })
        
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
};
const deleteWishlist = async(req,res) => {
    const _id = req.params.id;
    try {
        const wishlist = await Wishlist.findByIdAndDelete(_id);
        if(!wishlist){
            res.status(404).json({Error: "Wishlist not exist"});
        }
        res.status(200).json({Success: "product deleted"});
    } catch (error) {
        console.log("error",error);
    }
};
const myWishlist = async (req,res) => {
    const user = req.user; //accessing user from authorization
    //console.log("User",user)
    const _id = user._id;
    //console.log(_id)
    try {
        const wishlists = await Wishlist.find({ owner: _id }).populate("owner").populate("Products");
        //console.log(orders)
        res.status(200).json(wishlists);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
};
module.exports = {myWishlist,addWishlist,deleteWishlist};

