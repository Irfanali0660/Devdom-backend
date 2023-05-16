const mongoose = require('mongoose');
const moment=require('moment')
const commentSchema =new mongoose.Schema({
  
 
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "postData",
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "userData",
    },
    comment:{
        type:String,
        required:true
    },
    replay:[{
        message:{type:String},
        date:{type:Date},
        replayuserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "userData",
        },
    }],
    date:{type:Date},
   

})

module.exports = commentModel = mongoose.model('commentdata',commentSchema);