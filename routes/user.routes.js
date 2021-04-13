const express = require('express');
const router = express.Router();

//controllers
const { signin,signup,getAllUser,updateUser,deleteUser } = require('../controllers/user.controller');

//signup
router.post('/signup', signup);

//signin
router.post('/signin', signin);

//Crud Work
router.get('/getAllUser', getAllUser);
router.put('/updateUser/:id',  updateUser);
router.delete('/deleteUser/:id',  deleteUser);

//exporting
module.exports = router;