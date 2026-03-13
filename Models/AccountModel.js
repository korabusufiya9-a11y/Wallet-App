const mongoose = require ('mongoose');

const AccountSchema = new mongoose.Schema({
    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
    },
    name:{
        type :String,
        required: [true, "Account name is required"],
        trim: true
    },
    type:{
        type: String,
        required: [true, "Account type is required"],
        enum: ['savings', 'checking', 'credit', 'investment', 'loan'],
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        uppercase: true,
    },
    balance:{
        type: Number,
        required: [true, "Balance is required"],
        min: [0, "Balance cannot be negative"],
        
    },
    isActive:{
        type: Boolean,
        default: true,
    },
}, {
    timestamps: { createdAt: 'createdAt' }
});

const AccountModel = mongoose.model('Account', AccountSchema);   
module.exports= AccountModel;