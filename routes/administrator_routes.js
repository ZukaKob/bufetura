const upload = require('../utils/multer')
const {
    AddFood,
    LoginAdministrator,
    GetPendingOrders,
    AcceptOrders
} = require('../controllers/administrator_controller')
const { Authenticate } = require('../middlewares/authentication')


const router = require('express').Router() 

router.post('/login', LoginAdministrator)
router.post('/add_food', Authenticate, upload.single('image'), AddFood )
router.get('/pending_orders', Authenticate, GetPendingOrders)
router.put('/accept_orders/:order_id ', Authenticate, AcceptOrders)



module.exports = router 
