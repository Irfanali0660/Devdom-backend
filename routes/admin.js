var express = require('express');
var router = express.Router();
// const multer= require('../helpers/multer')
const multer=require('multer')
const { users,
        status,
        addtag,
        gettags,
        deletetag,
        tagdetails,
        adminlogin,
        edittag,
        }=require('../controller/admin/adminController')
const {liststatus,addlist,adgetlist}=require('../controller/admin/listController')
const {getreportedpost,deletepost}=require('../controller/admin/reportController');
const jwt = require('../helpers/jwt');
        const FILE_TYPE_MAP = {
          'image/png':'png',
          'image/jpeg':'jpeg',
          'image/jpg':'jpg'
      }
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          const isValid = FILE_TYPE_MAP[file.mimetype]
          let uploadError = new Error('invalid image type')
          if(isValid){
            uploadError = null
          }
          cb(uploadError, './public/images')
        },
        filename: function (req, file, cb) {
          const filename = file.originalname.split(' ').join('-')
          const extension = FILE_TYPE_MAP[file.mimetype]
          cb(null, `${filename.split('.')[0]}-${Date.now()}.${extension}`)
        }
      })
      const uploadOptions = multer({ storage:storage})
      



router.post('/adminlogin',adminlogin);
router.post('/addtag',jwt.verify,uploadOptions.array('image'),addtag)
router.post('/edittag',jwt.verify,uploadOptions.array('image'),edittag)
router.post('/addlist',jwt.verify,addlist)
router.post('/liststatus',jwt.verify,liststatus)

router.get('/users',jwt.verify,users)
router.get('/gettags',jwt.verify,gettags)
router.get('/tagdetails/:id',jwt.verify,tagdetails)
router.get('/adgetlist',jwt.verify,adgetlist)
router.get('/getreportedpost',jwt.verify,getreportedpost)

router.put('/status/:id',jwt.verify,status)

router.delete('/deletetag/:id',jwt.verify,deletetag)
router.delete('/deletepost/:id',jwt.verify,deletepost)




module.exports = router;
