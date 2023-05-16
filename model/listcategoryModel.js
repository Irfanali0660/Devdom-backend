const mongoose = require('mongoose');
const listcategorySchema =new mongoose.Schema({
  
    listcategory:{
        type:String,
        required:true,
        unique: true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = listcategoryModel = mongoose.model('listcategorydata',listcategorySchema);