const { default: mongoose } = require("mongoose");
const postModel = require("../../model/postModel");
const tagModel = require("../../model/tagModel");

module.exports={

    // get tag related post

    gettagpost:(req,res,next)=>{
        try {
            const id=new mongoose.Types.ObjectId(req.query.id)
       
            postModel.find({tag:{$in:[id]}}).populate('userId').then((data)=>{
                res.json(data)
            }).catch((error)=>{
                res.json(error)
            })
        } catch (error) {
            next(error)
        }
    },

    // get all tags

    gettags:(req,res,next)=>{
        try {
            tagModel.find().then((tag)=>{
                res.json(tag)
            })
        } catch (error) {
            next(error)
        }
    }
}