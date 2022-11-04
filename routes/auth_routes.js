const router  = require('express').Router() 
const {
        RegisterUser,
        LoginUser,
        VerifyUser,
        ForgotPassword,
        ResetPassword
} = require('../controllers/auth_controllers')

router.post('/register', RegisterUser)    
router.post('/login', LoginUser)   
router.get('/verify/:token', VerifyUser)    
router.post('/forgot_password',ForgotPassword)    
router.put('/reset_password/:user', ResetPassword)    

module.exports = router