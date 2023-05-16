const mongoose = require('mongoose');
const reportSchema =new mongoose.Schema({
  
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "postdata",
    },
    issue:{
        type:String,
        required:true
    },
    reporterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "userData"
    }
})

module.exports = listcategoryModel = mongoose.model('reportData',reportSchema);