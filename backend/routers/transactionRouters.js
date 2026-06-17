const express = require('express');
const router = express.Router();
const {addTransaction,getTransactions,deleteTransactions,updateTransactions, getMonthlyTransactions,getAllTransactions}=require('../controllers/transactionController')

const {protect} =require('../middleware/protected')
router.get('/transactions',protect,getTransactions);
router.get('/allTransactions',protect,getAllTransactions);
router.get('/analytics/monthly',protect,getMonthlyTransactions);
router.post('/transactions',protect,addTransaction);
router.delete('/transactions/:id',protect,deleteTransactions);
router.put('/transactions/:id',protect,updateTransactions);
module.exports = router;