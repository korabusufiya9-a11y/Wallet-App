const mongoose = require('mongoose');
const User = require('./UserModel');
const Category = require('./CategoryModel');

const BudgetSchema = new mongoose.Schema({

    useId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
    },
    CategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category ID is required"],
    },       
   name:{
        type: String,
        required: [true, "Budget name is required"],    
        trim: true
    },
    limitedAmount:{
        type: Number,
        required: [true, "Limited amount is required"],
        min: [0, "Limited amount cannot be negative"],
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        uppercase: true,
    },
    period:{
        type: String,
        required: [true, "Budget period is required"],
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    startDate:{
        type: Date,
        required: [true, "Start date is required"],
    },
    endDate:{
        type: Date,
        required: [true, "End date is required"],
    },
},{ timestamps: { createdAt: 'createdAt' } });

const BudgetModel = mongoose.model('Budget', BudgetSchema);
module.exports= BudgetModel;