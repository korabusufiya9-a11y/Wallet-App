const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
 
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User Id is required']
    },
    name:{
        type:String,
        required:[true,'Label name is required'],
        trim:true
    },
    color:{
        type:String,
        required:[true,'Label color is required'],
        match:[/^#([0-9A-F]{3}|[0-9A-F]{6})$/i,'Invalid color format. Use hex code like #FF5733']  
    }
},{
    timestamps:{createdAt:'createdAt'}
});

const LabelModel = mongoose.model('Label', LabelSchema);

module.exports= LabelModel;