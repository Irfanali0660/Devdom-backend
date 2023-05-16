const chatModel = require("../../model/chatModel")
const userModel = require("../../model/userModel")

module.exports={
    // get user
    getusers:(req,res,next)=>{
        try {
            userModel.find({_id:{$not:{$eq:res.locals.jwtUSER._id}}}).then((user)=>{
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