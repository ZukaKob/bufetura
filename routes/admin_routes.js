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


router.post('/admin/create_bufetura', AuthenticateAdmin, CreateAdministrator)  
router.get('/admin/get_foods', AuthenticateAdmin, GetFoods)
router.get('/admin/get_administratos', AuthenticateAdmin, GetAllAdministrator)
router.get('/admin/get_administrator/:username', AuthenticateAdmin, GetAdministrator)
router.get('/admin/get_users', AuthenticateAdmin, GetAllUser)
router.get('/admin/get_user/:email', AuthenticateAdmin, GetUser)
router.get('/admin/bufetura/:name', FindFoodForEachBufetura)

module.exports = router 