const express = require('express');
const router = express.Router();

//controllers
const { getAllProducts,addProduct,updateProduct, deleteProduct, getProductById } = require('../controllers/product.controller');
const {auth,userMiddleware} = require("../middlewares/auth")

router.get('/getAllProducts', getAllProducts);
router.post('/admin/addProduct', auth,userMiddleware, addProduct);
router.put('/admin/updateProduct/:id',auth,userMiddleware,  updateProduct);
//router.get('/admin/getProductBYId/:id',  getProductById);
router.delete('/admin/deleteProduct/:id', auth,userMiddleware, deleteProduct);


//exporting
module.exports = router;