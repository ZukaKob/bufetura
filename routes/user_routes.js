const { addItemToCart,
        getCartItems,
        deleteCartItems
} = require('../controllers/cart_controller')
const { UserCreateOrder } = require('../controllers/user_controller')
const { Authenticate } = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/cart', Authenticate, getCartItems)
router.delete('/cart/:food_id', deleteCartItems)
router.post('/cart/:food_id', Authenticate, addItemToCart)
router.post('/create_order', Authenticate, UserCreateOrder)


// router.get('/favourite_order', userGetFavouriteOrder)
// router.post('/add_to_favourites', userCreateFavouriteOrder)
// router.get('/get_order', userGetsAllOrder)
// router.get('/notifications', userGetNotification) 


module.exports = router 