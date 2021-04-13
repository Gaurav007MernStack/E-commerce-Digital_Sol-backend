const Order = require('../models/order');
const Product = require('../models/product');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const placeOrder = async(req,res) => {
    const { productId } = req.query;
    console.log(productId)
    const user = req.user; //accessing user from authorization
    const _id = user._id;
    //const firstName = user.firstName;
    //console.log(firstName)
    try {
        const order = new Order({ Products: productId, owner: { _id } });
        await order.save((error, order) => {
            if(error) return res.status(400).json({ error });  
            if(order){
                res.status(201).json({ order });
            }
        })
        
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
};
const myOrders = async (req,res) => {
    const user = req.user; //accessing user from authorization
    //console.log("User",user)
    const _id = user._id;
    //console.log(_id)
    try {
        const orders = await Order.find({ owner: _id }).populate("owner").populate("Products");
        //console.log(orders)
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
};
const getAllOrders = async (req,res) => {
    const user = req.user; //accessing user from authorization
    //console.log("User",user)
    //const _id = user._id;
    //console.log(_id)
    try {
        const orders = await Order.find().populate("owner").populate("Products");q  
        //console.log(orders)
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
};
const deleteOrder = async(req,res) => {
    const _id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(_id);
        if(!order){
            res.status(404).json("Order not exist");
        }
        res.status(200).json("Order Deleted");
    } catch (error) {
        console.log("error",error);
    }
}
module.exports = {myOrders,placeOrder,getAllOrders,deleteOrder};