const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const salt = bcrypt.genSaltSync(12);

exports.HashPassword = (myPlaintextPassword) => {
    return bcrypt.hashSync(myPlaintextPassword, salt)
}

exports.ComparePasswords = (password, hashed_password) => {
    return bcrypt.compare(password, hashed_password) 
}

exports.CreateAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '30d'})
}

exports.CreateAdministratorToken = (admin) => {
    return jwt.sign(admin, process.env.SECRET_KEY, {expiresIn: '60d'})
}

exports.VerifyUser = (user) => {
    return jwt.verify(user, process.env.SECRET_KEY)
}

exports.ValidateSignature = async (req) => {
    const token = req.get('Authorization') 

    if(token) {
        try {
            const payload = await jwt.verify(token.split(' ')[1], process.env.SECRET_KEY) 
            req.user = payload
    
            return true   
        } catch (error) {
            console.log(error) 
        }
    }

    return false 
}

exports.ValidateIfUserIsAdmin = async (req) => {
    const token = req.get('Authorization') 
    if(token) {
        const payload = await jwt.verify(token.split(' ')[1], process.env.SECRET_KEY) 
        const {isAdmin} = payload 
        if(isAdmin) {
            return true 
        }
        return false
    } 

    return false 
}