const mongoose = require('mongoose');
const listSchema =new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "userData",
    },
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "listcategorydata",
    },
    tag:[{
        type:String
    }],
    expdate:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
    },
    longitude:{
        type:Number
    },
    latitude:{
        type:Number
    },
})

module.exports = listModel = mongoose.model('listdata',listSchema);

