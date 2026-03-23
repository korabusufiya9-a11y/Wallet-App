const express = require('express');
const router = express.Router();
const BudgetController = require('../Controllers/BudgetController');

router.get('/', BudgetController.getAllBudgets);
router.get('/:id', BudgetController.getBudgetById);
router.post('/create', BudgetController.createBudget);
router.put('/update/:id', BudgetController.updateBudget);
router.delete('/delete/:id', BudgetController.deleteBudget);

module.exports = router;