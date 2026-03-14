const Record = require('../Models/RecordModel');
const Account = require('../Models/AccountModel');

// 1. CREATE Record & UPDATE Account Balance
exports.createRecord = async (req, res) => {
    try {
        const { accountId, amount, type, category, description } = req.body;

        
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ success: false, message: "Account sapadle nahi" });
        }

        
        const newRecord = await Record.create({
            accountId,
            amount,
            type, 
            category,
            description
        });

       
        if (type === 'income') {
            account.balance += amount;
        } else if (type === 'expense') {
            account.balance -= amount;
        }

        await account.save(); 

        res.status(201).json({ 
            success: true, 
            message: "Payment record zale ani balance update zala!",
            data: newRecord,
            updatedBalance: account.balance 
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 2. GET ALL RECORDS (History)
exports.getAllRecords = async (req, res) => {
    try {
        const records = await Record.find().sort({ createdAt: -1 }); // Latest aadhi distil
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. GET SINGLE RECORD
exports.getRecordById = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id).populate('accountId');
        if (!record) return res.status(404).json({ success: false, message: "Record nahi milale" });
        
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. DELETE RECORD 
exports.deleteRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        if (!record) return res.status(404).json({ success: false, message: "Record nahi milale" });

        const account = await Account.findById(record.accountId);
        if (!account) return res.status(404).json({ success: false, message: "Account nahi milale" });
        if (record.type === 'income') {
            account.balance -= record.amount;
        } else {
            account.balance += record.amount;
        }

        await account.save();
        await record.deleteOne();

        res.status(200).json({ success: true, message: "Record delete zale ani balance adjust zala!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};