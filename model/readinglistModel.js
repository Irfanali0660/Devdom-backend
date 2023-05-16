const mongoose = require('mongoose');
const readlistSchema =new mongoose.Schema({
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "userData",
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "postdata",
    },
    authId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "userData",
    },
    date:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = readlistModel = mongoose.model('readlistData',readlistSchema);