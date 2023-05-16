const mongoose = require('mongoose');
const moment=require('moment')
const chatSchema =new mongoose.Schema({
  
 
    messages: [{
        text: { 
          type: String,
        },
        sender: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'userData'
        },
        time:{
            type:Date,
        }
      }],
        users: [{                
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'userData'
        }]
})

module.exports = chattModel = mongoose.model('chatdata',chatSchema);