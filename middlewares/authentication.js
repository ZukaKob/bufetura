const { ValidateSignature, ValidateIfUserIsAdmin } = require("../utils/password_utils")

exports.Authenticate = async (req,res,next) => {
    const validate = await ValidateSignature(req) 
    if(validate){
        next()
    } else {
        return res.json({msg: "user not authorized"})
    }
}

exports.AuthenticateAdmin = async (req,res,next) => {
    const validateAdmin = await ValidateIfUserIsAdmin(req)

    if(validateAdmin) {
        next()
    } else {
        return res.json({msg: 'You are not allowed to do that'})
    }
    
}
