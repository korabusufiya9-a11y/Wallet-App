const express = require('express');
const router = express.Router();
const BudgetController = require('../Controllers/BudgetController');

router.get('/budget', BudgetController.getAllBudgets);
router.get('/budget/:id', BudgetController.getBudgetById);
router.post('/budget/create', BudgetController.create);
router.put('/updateBudget/:id', BudgetController.updateBudget);
router.delete('/deleteBudget/:id', BudgetController.deleteBudget);

module.exports = router;