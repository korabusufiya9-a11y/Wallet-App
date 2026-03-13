const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({

userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
},
name:{
    type: String,
    required: [true, 'Category name is required'],
    trim: true

},
masterCategory:{
    type: String,
    required: [true, 'Master category is required'],
    enum: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Education', 'Shopping', 'Travel', 'Other']
},
iconcolor:{
    type: String,
    required: [true, 'Icon color is required'],
    match: [/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, 'Invalid color format. Use hex code like #FF5733']
}
});

const CategoryModel = mongoose.model('Category', CategorySchema);   


module.exports= CategoryModel;