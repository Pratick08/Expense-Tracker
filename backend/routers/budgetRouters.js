const express = require('express');
const router = express.Router();
const {getBudgets,addBudget,deleteBudget,updateBudget}=require('../controllers/budgetController')
const {protect} =require('../middleware/protected')
router.get('/budgets',protect,getBudgets);
router.post('/budgets',protect,addBudget);
router.delete('/budgets/:id',protect,deleteBudget);
router.put('/budgets/:id',protect,updateBudget);
// router.delete('/transactions/:id',deleteTransactions);
// router.put('/transactions/:id',updateTransactions);
module.exports = router;      