const { default: mongoose } = require("mongoose");
const commentModel = require("../../model/commentModel");
const postModel = require("../../model/postModel");
const tagModel = require('../../model/tagModel');
const readinglistModel = require("../../model/readinglistModel");


module.exports={

  // add new post

    addpost:(req,res,next)=>{
      try { 
        let apiRes={}
        res.locals.upload(req, res, async function (err) {
          if (err) {
            apiRes.message = 'Error: Invalid type of file!'
           return res.json(apiRes);
          } else {
            if (req.file == undefined) {
              apiRes.message = 'Error: No Heading File Selected!'
             return res.json(apiRes);
            } else {
              let tagArray = req.body.tag.split(',');
          // const filenames = req.files.map((file) => file.filename);
            for (let i = 0; i < tagArray.length; i++) {
              let data= await tagModel.findOne({title:tagArray[i]})
              tagArray[i]=data?.id
            }
           
          let newpost=postModel({
            userId:res.locals.jwtUSER._id,
            post:req.body.editor,
            image:req.file.filename,
            tag:tagArray
          })
          newpost.save().then(()=>{
            apiRes.success = "success"
            res.json(apiRes).status(200)
          })
            }
          }
        });
        } catch (error) {
          next(error)
        }
    },

    // get all tags 

    gettag:(req,res,next)=>{
      try {
        let tag=[]
        tagModel.aggregate([{$match:{}},{$project:{title:1,_id:0}}]).then((data)=>{
          data.forEach(element => {
            tag.push(element.title)
          });
          res.json(tag).status(200)
        })
      } catch (error) {
        next(error)
      }
    },

    // show single post details

    singlepost:(req,res,next)=>{
      try {
        postModel.findOne({_id:req.params.id}).populate('userId').populate('tag').then((data)=>{
          res.json(data)
        })
      } catch (error) {
        next()
      }
    },

    // get comments

    comments:(req,res,next)=>{
      try {
        commentModel.find({postId:req.body.id}).sort({'date':-1}).populate('userId').populate('replay.replayuserId').then((data)=>{
          res.json(data)
        })
      } catch (error) {
        next(error)
      }
    },

    // like and dislike

    addlike:(req,res,next)=>{
      try {

      if(req.body.value){
        postModel.updateOne({_id:req.body.id},{$addToSet:{likes:res.locals.jwtUSER._id}}).then((data)=>{
          res.json()
        })
      }else{
        postModel.updateOne({_id:req.body.id},{$pull:{likes:res.locals.jwtUSER._id}}).then((data)=>{
          res.json()
        })
      }
      } catch (error) {
        next(error)
      }
    },
    addreadlist:async(req,res,next)=>{
      try {

        let post=await postModel.findOne({_id:req.body.id})
        let read=await readinglistModel.findOne({postId:req.body.id})
       if(!read){
        let readlist=new readinglistModel({
          userId:res.locals.jwtUSER._id,
          postId:req.body.id,
          authId:post.userId
        })
        readlist.save().then(()=>{
          res.json('success')
        })
       }else{
        res.json('alreadyadded')
       }
      } catch (error) {
        next(error)
      }
    },
    getreadlist:(req,res,next)=>{
      try {
    
        const user=new mongoose.Types.ObjectId(res.locals.jwtUSER._id)
        readinglistModel.aggregate([{$match:{userId:user}},{$lookup:{from:'postdatas',localField:'postId',foreignField:'_id',as:'post'}},{$lookup:{from:'userdatas',localField:'authId',foreignField:'_id',as:'auth'}}]).then((data)=>{
          res.json(data)
        })
      } catch (error) {
        next(error)
      }
    },
    removereadlist:(req,res,next)=>{
      try { 
        readinglistModel.deleteOne({_id:req.params.id}).then(()=>{
          res.json()
        })
      } catch (error) {
        next(error)
      }
    },
    deletecomment:(req,res,next)=>{
      try {
        commentModel.deleteOne({_id:req.params.id}).then(()=>{
          res.json()
        })
      } catch (error) {
        next(error)
      }
    }
}
