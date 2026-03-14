const express = require('express');
const router = express.Router();
const BudgetController = require('../Controllers/BudgetController');

 router.post('/createBudget',BudgetController.create);
 router.get('/getuserBudget/user/:userId',BudgetController.getuser);
 router.put('/updateBudget/:id',BudgetController.update);
 router.delete('/deleteBudget/:id',BudgetController.delete);


module.exports = router;