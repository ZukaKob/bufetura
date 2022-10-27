const { CreateAdministrator } = require('../controllers/admin_controller')
const { AuthenticateAdmin } = require('../middlewares/authentication')

const router  = require('express').Router() 

router.post('/admin/create_bufetura', AuthenticateAdmin, CreateAdministrator)  

module.exports = router 