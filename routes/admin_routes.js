const { CreateAdministrator,
        GetFoods,
        GetAllAdministrator,
        GetAdministrator,
        GetAllUser,
        GetUser,
        FindFoodForEachBufetura
} = require('../controllers/admin_controller')
const { AuthenticateAdmin } = require('../middlewares/authentication')

const router  = require('express').Router() 


router.post('/create_bufetura', AuthenticateAdmin, CreateAdministrator)  
router.get('/get_foods', AuthenticateAdmin, GetFoods)
router.get('/get_administratos', AuthenticateAdmin, GetAllAdministrator)
router.get('/get_administrator/:username', AuthenticateAdmin, GetAdministrator)
router.get('/get_users', AuthenticateAdmin, GetAllUser)
router.get('/get_user/:email', AuthenticateAdmin, GetUser)
router.get('/bufetura/:name', FindFoodForEachBufetura)

module.exports = router 