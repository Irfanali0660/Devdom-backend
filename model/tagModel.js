const mongoose = require('mongoose');

const tagSchema =new mongoose.Schema({
  
    title:{
        type:String,
        required:true,
        unique:true,
        uppercase: true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:null
    },
    followers:[mongoose.Schema.Types.ObjectId]

})

module.exports = tagModel = mongoose.model('tagData',tagSchema);