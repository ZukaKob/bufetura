const multer = require('multer') 

const imageStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'images')
    },
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname)
    }
})

