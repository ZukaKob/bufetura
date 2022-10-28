const { AddFood, LoginAdministrator } = require('../controllers/administrator_controller')
const { Authenticate } = require('../middlewares/authentication')

const router = require('express').Router() 



router.post('/add_food', Authenticate, AddFood)
router.post('/login', LoginAdministrator) 

module.exports = router 
