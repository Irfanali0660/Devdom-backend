const tagModel = require("../../model/tagModel");
const userModel = require("../../model/userModel")
const jwt = require("../../helpers/jwt");
const listModel = require("../../model/listcategoryModel");



module.exports={

    // admin login

    adminlogin:(req,res,next)=>{
        try {
          let apiRes={}
            if(req.body.password==process.env.AD_PASSWORD && req.body.email==process.env.AD_EMAIL){
                let token = jwt.sign({
                    email:process.env.AD_EMAIL,
                })
                apiRes.token = token;
                apiRes.success="Success"
                res.json(apiRes)
            }else{
                apiRes.failed="Admin can only access this page"
                res.json(apiRes)
            }
        } catch (error) {
            next(error)
        }
    },


    // get all users

    users:(req,res,next)=>{
        try {
            userModel.find().then((data)=>{
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },

    // user block or unblock

    status:async(req,res,next)=>{
        try {
            if(req.params.id){
                let usercheck=await userModel.findOne({_id:req.params.id})
                  if(usercheck){
                      if(usercheck.status==true){
                          userModel.updateOne({_id:req.params.id},{$set:{status:false}}).then(()=>{
                              res.json()
                          })
                      }else{
                          userModel.updateOne({_id:req.params.id},{$set:{status:true}}).then(()=>{
                              res.json()
                          })
                      }
                  }
              }
        } catch (error) {
            next(error)
        }
    },  

    // add new tag

    addtag:(req,res,next)=>{
        try {
            const filenames = req.files.map((file) => file.filename);
            let tag=tagModel({
                title:req.body.title,
                description:req.body.description,
                image:filenames[0]
            })
            tag.save().then(()=>{
                res.json({success:"tag data added successfully"}).status(200)
            }).catch((error)=>{
                if (error.code === 11000) {
                 res.json({error:'duplicate'})
                }
            })
        } catch (error) {
            next(error)
        }
    },

    // edit tag

    edittag:(req,res,next)=>{
        try {
            let apiRes={}
            let tag={
                title:req.body.title,
                description:req.body.description,
            }
            if(req.files){
                const filenames = req.files.map((file) => file.filename);
                tag.image=filenames[0]
            }
            tagModel.updateOne({_id:req.body.id},{$set:tag}).then(()=>{
                apiRes.success="edit success"
                res.json(apiRes)
            })
        } catch (error) {
            next(error)
        }
    },

    // get all tagb

    gettags:(req,res,next)=>{
        try {
            tagModel.find().then((data)=>{
               res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },

    // delete tag

    deletetag:(req,res,next)=>{
        try {
            tagModel.deleteOne({_id:req.params.id}).then(()=>{
                res.json().status(200)
            }).catch(()=>{
                res.json({failed:"ERROR"})
            })
        } catch (error) {
            next(error)
        }
    },

    //get single tag details

    tagdetails:(req,res,next)=>{
        try {
            tagModel.findOne({_id:req.params.id}).then((data)=>{
                res.json({data}).status(200)
            })
        } catch (error) {
            next(error)
        }
    },
    

}