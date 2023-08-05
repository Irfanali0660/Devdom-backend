// const multer=require('multer')

// const FILE_TYPE_MAP = {
//     'image/png':'png',
//     'image/jpeg':'jpeg',
//     'image/jpg':'jpg'
// }
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype]
//     let uploadError = new Error('invalid image type')
//     if(isValid){
//       uploadError = null
//     }
//     cb(uploadError, './public/productimages')
//   },
//   filename: function (req, file, cb) {
//     const filename = file.originalname.split(' ').join('-')
//     const extension = FILE_TYPE_MAP[file.mimetype]
//     cb(null, `${filename.split('.')[0]}-${Date.now()}.${extension}`)
//   }
// })
// const uploadOptions = multer({ storage:storage})
// module.exports={uploadOptions}
const path=require('path')

module.exports={
  multer_init: (inpdata = {route,filename})=>{
    return (req,res,next)=>{
        try {
            const multer = require('multer');
            // Set storage engine
            const storage = multer.diskStorage({
            destination: './public/'+inpdata.route,
            filename: function(req, file, callback) {
                callback(null, file.originalname.split('.')[0] + '-viz' + Date.now() + path.extname(file.originalname));
            }
            });
    
            // Initialize upload
            res.locals.upload = multer({
                storage: storage,
                limits: { fileSize: 100000000000 }, // 10MB
                fileFilter: function(req, file, callback) {
                checkFileType(file, callback);
                }
            }).single(inpdata.filename); // 'avatar' is the name attribute of the input file element in the form
            next()
        } catch (error) {
            res.json({
                message:'Error: Upload error!',
                status:500,
                authorization:true,
                data:{}
            })
        }
  
    }
    function checkFileType(file, callback) {
        const filetypes = /jpeg|jpg|png/; // Allowed file extensions
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
         return callback(null, true);
        } else {
          return callback('Error: File type should be image!');
        }
    }
  }
}