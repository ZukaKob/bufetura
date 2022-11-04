const upload = require('../utils/multer')
const { AddFood, LoginAdministrator } = require('../controllers/administrator_controller')
const { Authenticate } = require('../middlewares/authentication')


const router = require('express').Router() 


// const imageStorage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null, 'images')
//     },
//     filename: function(req,file,cb) {
//         cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname)
//     }
// })

// const IMAGES = multer({storage: imageStorage}).array('images', 10) 


router.post('/add_food', Authenticate, upload.single('image'), AddFood )
router.post('/login', LoginAdministrator) 



module.exports = router 
