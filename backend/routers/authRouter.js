const express = require('express');
const router = express.Router();
const {register,login, refreshToken, logout,updateProfile,updateAvatar,updatePass,deleteAccount}=require('../controllers/authController')
const {protect} =require('../middleware/protected');
router.post('/register',register);
router.post('/login',login);
router.get('/refresh-token',refreshToken);
router.get('/logout',logout);
router.put('/updateProfile',protect,updateProfile);
router.put('/updateAvatar',protect,updateAvatar);
router.put('/updatePass',protect,updatePass);
router.delete('/deleteAccount',protect,deleteAccount); 
// router.delete('/transactions/:id',deleteTransactions);
// router.put('/transactions/:id',updateTransactions);  
module.exports = router;