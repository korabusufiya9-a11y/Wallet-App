const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
        
    },
    otp:{
        type: Number,
        select: false,
    },
    otpExpiry: {
        type: Date,
        select: false,
    },
    status:{
        type: String,
        required: true,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',  
    },
    baseCurrency:{
        type: String,
        required: true,
        default: 'INR',
        uppercase: true,
                     
    },
    
}, { 
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
});

const User = mongoose.model('User', UserSchema);
module.exports = User;