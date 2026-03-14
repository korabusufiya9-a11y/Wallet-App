const express = require('express');
const router = express.Router();
const accountController = require('../Controllers/AccountController');

// Account routes
router.get('/', accountController.getAllAccounts); // Get all accounts
router.post('/', accountController.createAccount);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;

