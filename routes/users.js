var express = require('express');
var router = express.Router();
const { signup,login,otp,generateotp,sociallogin,socialsignup,forgotpass,resetpassword,blockStatus,passwordcheck } = require('../controller/auth/auth');
const { addpost,gettag,singlepost,comments,addlike,addreadlist,getreadlist,removereadlist,deletecomment }= require('../controller/user/postController')
const { gettagdetails,getuser,getpostdetails,getsingletag,report }=require('../controller/user/homeContorll')
const {getlistcate,addnewlist,getlist,singlelist}=require('../controller/user/listController')
const { gettagpost,gettags }=require('../controller/user/tagcontroller')
const { updatebio,userlist,deletelist,editlist,updateList,getuserpost,deletepost,updateproimg}=require('../controller/user/dashboardControl')
const { getusers,chatroom ,chatmessage}=require('../controller/user/chatController')
const jwt = require('../helpers/jwt');
const multer=require('multer');
const { verify } = require('jsonwebtoken');


const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}
const storage = multer.diskStorage({
  destination: function (req,file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]
    let uploadError = new Error('invalid image type')
    if(isValid){
      uploadError = null
    }else{
      return error='invalid file'
    }
    cb(uploadError, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(' ').join('-')
    const extension = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${filename.split('.')[0]}-${Date.now()}.${extension}`)
    console.log("HELLO");
  }
})
const uploadOptions = multer({ storage:storage})




/* GET users listing. */
router.post('/signup',signup);
router.post('/login',login)
router.get('/sociallogin/:id',sociallogin)
router.post('/addpost',uploadOptions.array('image'),jwt.verify,addpost)
router.post('/forgotpass',forgotpass)
router.post('/comments',comments)
router.post('/addnewlist',jwt.verify,addnewlist)
router.post('/report',jwt.verify,report)
router.post('/addreadlist',jwt.verify,addreadlist)
router.post('/passwordcheck',jwt.verify,passwordcheck)

router.get('/socialsignup/:id',socialsignup)
router.get('/getsingletag/:id',getsingletag)

router.post('/resetpassword',resetpassword)

router.put('/otp',jwt.verify,otp)
router.put('/addlike',jwt.verify,addlike)
router.post('/updateproimg/:id',uploadOptions.single('avatar'),updateproimg)

router.get('/gettag',gettag)
router.get('/gettagdetails',gettagdetails)
router.get('/generateotp',jwt.verify,generateotp)
router.get('/getuser',jwt.verify,getuser)
router.get('/getpostdetails',getpostdetails)
router.get('/singlepost/:id',singlepost)
router.get('/getlistcate',getlistcate)
router.get('/getlist',getlist)
router.get('/gettagpost',gettagpost)
router.get('/gettags',gettags)
router.get('/getreadlist',jwt.verify,getreadlist)
router.get('/userlist',jwt.verify,userlist)
router.get('/editlist/:id',jwt.verify,editlist)
router.get('/getusers',jwt.verify,getusers)
router.get('/chatroom/:id',jwt.verify,chatroom)
router.get('/chatmessage/:id',jwt.verify,chatmessage)
router.get('/getuserpost',jwt.verify,getuserpost)
router.get('/blockStatus',jwt.verify,blockStatus)
router.get('/singlelist/:id',jwt.verify,singlelist)

router.put('/updatebio',jwt.verify,updatebio)
router.put('/updateList',jwt.verify,updateList)

router.delete('/removereadlist/:id',removereadlist)
router.delete('/deletelist/:id',deletelist)
router.delete('/deletepost/:id',deletepost)
router.delete('/deletecomment/:id',deletecomment)
module.exports = router;
