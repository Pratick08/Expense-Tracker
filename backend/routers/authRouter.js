const express = require('express');
const router = express.Router();
const {register,login, refreshToken, logout}=require('../controllers/authController')

router.post('/register',register);
router.post('/login',login);
router.get('/refresh-token',refreshToken);
router.get('/logout',logout);
// router.delete('/transactions/:id',deleteTransactions);
// router.put('/transactions/:id',updateTransactions);
module.exports = router;