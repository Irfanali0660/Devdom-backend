const listModel = require("../../model/listcategoryModel");

module.exports={


    // add new list

    addlist:async(req,res,next)=>{
        try {
            let check=listModel.findOne({listcategory:req.body.listcategory})
            let list=new listModel({listcategory:req.body.listcategory,description:req.body.description})
            list.save().then((newdata)=>{
                res.json({success:"added succesfully"})
            }).catch((err)=>{
                if (err.code === 11000) {
                 res.json({failed:'duplicate'})
                }
            })
        } catch (error) {
            next(error)
        }
    },

    // get all list 

    adgetlist:(req,res,next)=>{
        try {
            listModel.find().then((data)=>{
                
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },

    // list status list or unlist

    liststatus:async(req,res,next)=>{
        if(req.body.listid){
            let liststatus=await listModel.findOne({_id:req.body.listid})
              if(liststatus){
                  if(liststatus.status==true){
                      listModel.updateOne({_id:req.body.listid},{$set:{status:false}}).then((data)=>{
                          res.json()
                      })
                  }else{
                      listModel.updateOne({_id:req.body.listid},{$set:{status:true}}).then((data)=>{
                        res.json()
                      })
                  }
              }
          }
    }

}