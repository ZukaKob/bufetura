const {
    UserCreateOrder,
    UserGetFoods,
    UserGetsPendingOrders,
    UserGetFinishedOrders
} = require('../controllers/user_controller')
const { Authenticate } = require('../middlewares/authentication')

const router = require('express').Router()


router.get('/foods', Authenticate, UserGetFoods)
router.post('/order', Authenticate, UserCreateOrder)
router.get('/pending_orders', Authenticate, UserGetsPendingOrders)
router.get('/finished_orders', Authenticate, UserGetFinishedOrders)
 
// router.get('/favourite_order', userGetFavouriteOrder)
// router.post('/add_to_favourites', userCreateFavouriteOrder)
// router.get('/get_order', userGetsAllOrder)
// router.get('/notifications', userGetNotification) 


module.exports = router 