const listModel = require("../../model/listModel");
const postModel = require("../../model/postModel");
const userModel = require("../../model/userModel");

module.exports={

    //updatebio
    updatebio:(req,res,next)=>{
        try {
            userModel.updateOne({_id:res.locals.jwtUSER._id},{$set:{
                userName:req.body.form.userName,
                phone:req.body.form.phone,
                work:req.body.form.work,
                location:req.body.form.location,
                birthday:req.body.form.birthday,
                gender:req.body.form.gender,
                address:req.body.form.address,
            }}).then(()=>{
               res.json({success:"updated suucesfully"})
            }).catch((error)=>{
                next(error)
            })
        } catch (error) {
            next(error)
        }
    },

    //userlist

    userlist:(req,res,next)=>{
        try {
            listModel.find({userId:res.locals.jwtUSER._id}).populate('userId').then((list)=>{
                res.json(list)
            })
        } catch (error) {
            next(error)
        }
    },

    // deletelist

    deletelist:(req,res,next)=>{
        try {
            listModel.deleteOne({_id:req.params.id}).then(()=>{
                res.json({success:"list deleted successfully"})
            })
        } catch (error) {
            next(error)
        }
    },

    // edit list

    editlist:(req,res,next)=>{
        try {
            listModel.findOne({_id:req.params.id}).populate('category').then((list)=>{
                res.json(list)
            })
        } catch (error) {
            next(error)
        }
    },

    // update list
    updateList:(req,res,params)=>{
        try {
            listModel.updateOne({_id:req.body._id},{$set:{
                title:req.body.title,
                details:req.body.details,
                category:req.body.category,
                expdate:req.body.expdate,
                tag:req.body.tag,
                location:req.body.location,
                date:Date.now()
            }}).then(()=>{
                res.json({success:"success"})
            })
        } catch (error) {
            next(error)
        }
    },
    // get user post
    getuserpost:(req,res,next)=>{
       try {
        postModel.find({userId:res.locals.jwtUSER._id}).populate('userId').populate('tag').sort({date:-1}).then((post)=>{
            res.json(post)
        })
       } catch (error) {
        next(error)
       }
    },
    // delet post

    deletepost:(req,res,next)=>{
        try {
            postModel.deleteOne({_id:req.params.id}).then(()=>{
                res.json()
            })
        } catch (error) {
            next(error)
        }
    },

    // updateproimg
    updateproimg:(req,res,next)=>{
        try {

            let apiRes={}

          if (req.file == undefined) {
            apiRes.failed = 'Error: No File Selected!'
            res.json(apiRes);
          } else {
            userModel.updateOne({_id:req.params.id},{$set:{image:req.file.filename}}).then((data)=>{

                apiRes.success = 'Profile updated successful!'
              apiRes.status = "ok"
              res.json(apiRes);
            }).catch((err)=>{
              apiRes.failed = 'Internal error detected while updating profile picture!'
              apiRes.status = 500
              res.json(apiRes);
            })
          }
        } catch (error) {
            next(error)
        }
    }
}