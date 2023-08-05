const chatModel = require("../../model/chatModel")
const userModel = require("../../model/userModel")

module.exports={
    // get user
    getusers:(req,res,next)=>{
        try {
            userModel.aggregate([
                {
                  $match: {
                    _id: { $ne: res.locals.jwtUSER._id }
                  },
                },{
                    $project:{
                        _id:1,userName:1,googleimage:1,image:1
                    }
                }
              ])
              .then((user)=>{
                res.json(user)
            })
        } catch (error) {
            next(error)
        }
    },

    //creatitng chat room

    chatroom:async(req,res,next)=>{
        try {
           let chatroom = await chatModel.findOne({users:{ $all: [ req.params.id,res.locals.jwtUSER._id ]}})
           if(!chatroom){
            let newRoom=chatModel({
                users:[
                    req.params.id,
                    res.locals.jwtUSER._id
                ]
            })
            newRoom.save().then((room)=>{
                res.json(room._id)
            })
           }else{
            res.json(chatroom._id)
           }
        } catch (error) {
            next(error)
        }
    },

    // chat message

    chatmessage:(req,res,next)=>{
        try {
            chatModel.findOne({_id:req.params.id}).populate('messages.sender').then((message)=>{
                res.json(message)
            })
        } catch (error) {
            next(error)
        }
    }
}