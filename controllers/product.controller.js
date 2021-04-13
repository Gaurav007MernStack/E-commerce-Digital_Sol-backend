const Product = require('../models/product');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/user');


//For Creating Product
exports.addProduct = (req,res) => {
    const {
        title,price,description,category,image
    } = req.body;
    


    const product = new Product({
        title: title,
        price,
        description,
        category,
        image,
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error });  
        if(product){
            res.status(201).json({ product });
        }
    }));
}
exports.getAllProducts = (req,res) => {
    Product.find({})
    .exec((error, products) => {
        if(error) return res.status(400).json({ error });
        if(products){
            res.status(200).json({ products });
        }
    });
}
exports.deleteProduct = async(req,res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(_id);
        if(!product){
            res.status(404).json({Error: "product not exist"});
        }
        res.status(200).json({Success: "product deleted"});
    } catch (error) {
        console.log("error",error);
    }
}
exports.updateProduct = async(req,res) => {
    const _id = req.params.id;
    const data = req.body;
    try {
        const product = await Product.findByIdAndUpdate(
            {_id},
            {$set:data}, 
            {new:true}
        );
        if(!product){
            res.status(404).json({Error: "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        console.log("error", error);
    }
}
// Get By Id From DB
exports.getProductById = async(req,res)=>{
    try {
        let id = req.params.id;
        const getProduct = await Product.findById(id);
        res.status(200).json(getProduct);
    } catch (error) {
        console.log("error",error);
    }
}