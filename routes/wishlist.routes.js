const express = require('express');
const router = express.Router();

//controllers
const { myWishlist, addWishlist, deleteWishlist } = require('../controllers/wishlist.controller')
const {auth} = require('../middlewares/auth')

router.get('/myWishlist',auth, myWishlist );
router.post('/addWishlist',auth, addWishlist);
router.delete('/deletewishlist/:id',auth, deleteWishlist);

//exporting
module.exports = router