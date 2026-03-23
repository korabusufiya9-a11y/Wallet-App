const Record= require('../Models/RecordModel');
const Account = require('../Models/AccountModel');

// 1. CREATE Record & UPDATE Account Balance
exports.createRecord = async (req, res) => {
    try {
        const { userId, accountId, categoryId, amount, type, Date, note } = req.body;

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ success: false, message: "Account not found" });
        }

        const newRecord = await Record.create({
            userId,      
            accountId,
            categoryId, 
            amount,
            type, 
            Date,        
            note 
        });

        if (type === 'income') {
            account.balance += amount;
        } else if (type === 'expense') {
            account.balance -= amount;
        }

        await account.save(); 

        res.status(201).json({ 
            success: true, 
            message: "record created",
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

exports.updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, type, accountId } = req.body;

        const oldRecord = await Record.findById(id);
        if (!oldRecord) return res.status(404).json({ success: false, message: "Record not found" });

        const account = await Account.findById(oldRecord.accountId);
        if (!account) return res.status(404).json({ success: false, message: "Account not found" });

        // 1. Pahile juna transaction reverse kara (Undo balance)
        if (oldRecord.type === 'income') {
            account.balance -= oldRecord.amount;
        } else {
            account.balance += oldRecord.amount;
        }

        // 2. Nava transaction apply kara
        if (type === 'income') {
            account.balance += amount;
        } else {
            account.balance -= amount;
        }

        await account.save();

        // 3. Record update kara
        const updatedRecord = await Record.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ 
            success: true, 
            message: "Record is updated successfully!", 
            data: updatedRecord,
            newBalance: account.balance
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. GET SINGLE RECORD
exports.getRecordById = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id)
        if (!record) return res.status(404).json({ success: false, message: "Record not found" });
        
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. DELETE RECORD 
exports.deleteRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        if (!record) return res.status(404).json({ success: false, message: "Record not found" });

        const account = await Account.findById(record.accountId);
        if (!account) return res.status(404).json({ success: false, message: "Account not found" });
        if (record.type === 'income') {
            account.balance -= record.amount;
        } else {
            account.balance += record.amount;
        }

        await account.save();
        await record.deleteOne();

        res.status(200).json({ success: true, message: "successfully delete record" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};