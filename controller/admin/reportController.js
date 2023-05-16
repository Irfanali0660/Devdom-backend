const postModel = require("../../model/postModel")
const reportModel = require("../../model/reportModel")

module.exports={

    //+++++++++++++++++++ get reported post +++++++++++++++++++++++++++++

    getreportedpost:(req,res,next)=>{
        try {
            reportModel.find().populate('reporterId').populate('postId').then((data)=>{
                res.json(data)
            })
        } catch (error) {
            next(error)
        }
    },

    //+++++++++++++++++++ Delete reported post  ++++++++++++++++++++++++++

    deletepost:(req,res,next)=>{
        try {
            reportModel.findOne({_id:req.params.id}).then(async (data)=>{
            await  postModel.deleteOne({_id:data.postId})
            reportModel.deleteOne({_id:req.params.id}).then(()=>{
                res.json()
            })
            })
        } catch (error) {
            next(error)
        }
    }
}