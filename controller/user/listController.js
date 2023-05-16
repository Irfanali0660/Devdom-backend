const listModel = require("../../model/listModel");
const listcategoryModel = require("../../model/listcategoryModel")
// const { maptilerClient }=require('@maptiler/client')

module.exports={

  // getlistcategorys

    getlistcate:(req,res,next)=>{
      try {
        listcategoryModel.aggregate([{$match:{status:false}}]).then((listcategory)=>{
            res.json(listcategory)
        })
      } catch (error) {
        next(error)
      }
    },

    // add new listing

    addnewlist:async(req,res,next)=>{
        try {
            let newlist=listModel({
              userId:res.locals.jwtUSER._id,
              title:req.body.formData.title,
              details:req.body.formData.details,
              category:req.body.formData.category,
              expdate:req.body.formData.expdate,
              location:req.body.location.text,
              tag:req.body.tags,
              longitude:req.body.location.center[0],
              latitude:req.body.location.center[1],
              date:Date.now()
            })


    // geocodeAddress();
            newlist.save().then(()=>{
              res.json()
            }).catch((error)=>{
            })
        } catch (error) {
            next(error)
        }
    },

    // get list

    getlist:(req,res,next)=>{
      try {
        listModel.find().populate('userId').then((list)=>{  
          res.json(list)
        })
      } catch (error) {
        next(error)
      }
    },
    singlelist:(req,res,next)=>{
      try {
        listModel.findOne({_id:req.params.id}).populate('userId').then((list)=>{
          res.json(list)
        })
      } catch (error) {
        next(error)
      }
    }
}