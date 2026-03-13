const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
        required: [true, 'User ID is required']
    },
    accountId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',    
        required: [true, 'Account ID is required']

    },
    amount:{
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']

    },
    type:{
        type: String,
        required: [true, 'Payment type is required'],
        enum: ['income', 'expense',"transfer"],
    },
 }, {
    timestamps: { createdAt: 'createdAt' }
});

const PaymentModel = mongoose.model('Payment', PaymentSchema);
module.exports= PaymentModel;