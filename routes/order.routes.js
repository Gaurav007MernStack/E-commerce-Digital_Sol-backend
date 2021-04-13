const express = require('express');
const router = express.Router();

//controllers
const { myOrders, placeOrder, getAllOrders, deleteOrder } = require('../controllers/order.controller')
const {auth, userMiddleware} = require('../middlewares/auth')

router.get('/myOrders',auth,myOrders );
router.post('/placeOrder',auth,  placeOrder);
router.get('/getAllOrders',userMiddleware, getAllOrders);
router.delete('/deleteOrder/:id', deleteOrder);

//exporting
module.exports = router;