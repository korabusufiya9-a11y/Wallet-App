const AccountModel = require('../Models/AccountModel');

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await AccountModel.find();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAccount = async (req, res) => {
    try {
        const account = new AccountModel(req.body);
        const savedAccount = await account.save();
        res.status(201).json(savedAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAccountById = async (req, res) => {
    try {
        const account = await AccountModel.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const account = await AccountModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const account = await AccountModel.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

