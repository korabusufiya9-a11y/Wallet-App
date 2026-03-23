const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const    RecordSchema = new mongoose.Schema({
    userId: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Account ID is required"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category ID is required"],
    },
    labelId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label',
    }],
    type: {
        type: String,
        required: [true, "Record type is required"],
        enum: ['income', 'expense', 'transfer'],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount cannot be negative"],
    },
    Date: {
        type: Date,
        required: [true, "Date is required"],           
    },
    note: {
        type: String,
        trim: true,
    },
    toAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
            required: function() {
                return this.type === 'transfer';
            }
    },
}, {
    timestamps: { createdAt: 'createdAt' }
});
const RecordModel = mongoose.model('Record', RecordSchema);

module.exports= RecordModel;