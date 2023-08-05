const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
  
    userName: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:null
    },
    googleimage:{
        type:String,
        default:null
    },
    phone:{
        type:Number,
        default:null
    },
    status:{
        type:Boolean,
        default:false
    },
    location:{
        type:String,
        default:null
    },
    verifyemail:{
        type:Boolean,
        default:false
    },
    joinedDate:{
        type:Date,
        default:Date.now(),
        index:true  
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    birthday:{
        type:Date
    },
    work:{
        type:String
    }

})

module.exports = userModel = mongoose.model('userData',userSchema);