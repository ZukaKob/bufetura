const User = require('../models/user_model')
const { ValidateEmail } = require('../utils/email_validate')
const { HashPassword,
        ComparePasswords,
        CreateAccessToken,
        VerifyUser
} = require('../utils/password_utils')
const { SendVerificationEmail,
        SendForgotPasswordEmail
} = require('../utils/send_email')

// @Desc Register User
// @Route POST /api/v1/register 
// @Access public 
exports.RegisterUser = async (req,res) => {
    try {
        const { username, email, password } = req.body

        if( !username || !email || !password ) {
            return res.status(400).json({success:false, msg:"Enter all fields"})
        } 
        else if(!ValidateEmail(email)){
            return res.json({success:false, msg:"Enter valid email"})
        }
        else {
            const user = await User.findOne({email}) 
            if(user){res.status(400).json({
                success:false,
                msg:"This email is already used"
            })} else {
                const hashed_password = HashPassword(password)

                const newUser = await User({
                    username:username,
                    email:email,
                    password:hashed_password
                })
                
                await newUser.save() 

                // Sending email to verify user
                const verify_token = await CreateAccessToken(newUser.toJSON()) 
                const url = `${process.env.CLIENT_URL}/api/v1/verify/${verify_token}`
                SendVerificationEmail(email, url, "დააჭირე ვერიფიკაციისთვის")
 
                return res.status(200).json(newUser)
            } 
        }    
    } catch (error) {
        res.status(400).json({
            error: error,
            msg: "Something wrong try again"
        })
    }
}
// @Desc Login User
// @Route POST /api/v1/login
// @Access public
exports.LoginUser = async(req,res) => {
    const {email,password} = req.body 
    if(!email || !password) {
        res.status(400).json({
            success:false,
            msg: "Please insert all fields"
        })
    } else if(!ValidateEmail(email)) {
        res.status(400).json({
            success:false,
            msg: "Please Enter valid email"
        })
    } else {
        const user = await User.findOne({email})
        if(user){
            const password_matched = await ComparePasswords(password, user.password) 
                if(password_matched) {
                    const access_token = await CreateAccessToken(user.toJSON())
                    res.status(200).json({
                        success: true,
                        token: access_token 
                    })
                } else {
                    res.status(400).json({
                        success:false,
                        msg:"Please enter correct password"
                    })
                }
        } else {
            res.status(400).json({
                success:false,
                msg: "Please enter correct email"
            })
        }
    }
}
// @Desc Verify User
// @Route GET /api/v1/verify/:token
// @Access Private
exports.VerifyUser = async (req,res) => {
    
    const {_id, verified} = await VerifyUser(req.params.token)
    const user = await User.findOne({ _id: _id }) 

    try {
        if(verified === user.verified){
            await User.findByIdAndUpdate(_id, {verified: true})
            res.status(200).json({
                success:true,
                msg: 'User has been verified'
            })
        } else {
            res.status(200).json({
                success: true,
                msg: "User is already verified"
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            msg: "Something wrong try again"
        })
    }
}
// @Desc Sending email to user 
// @Route POST /api/v1/forgot_pass
// @Access Public
exports.ForgotPassword = async (req,res) => {

    const {email} = req.body 
    
    const user = await User.findOne({email}) 
    const verify_token = await CreateAccessToken(user.toJSON()) 
    const url = `${process.env.CLIENT_URL}/api/v1/reset_password/${verify_token}`
    SendForgotPasswordEmail(email, url, "აღსდექი დროულად")

    return res.json({
        success:true,
        msg: "Check your gmail to continue using this application"
    })
}

// @Desc Reset user password
// @Route PUT /api/v1/reset_password/:user
// @Access Private 
exports.ResetPassword = async (req,res) => {
    
    const {_id} = VerifyUser(req.params.user) 
    const {password} = req.body 
    const user = await User.findOne({_id})

    try {
        if(await ComparePasswords(password,user.password)) {
            res.status(400).json({
                success:false,
                msg: "You are already using that password try another one"
            })
        } else {
            const updated_user =  await User.findByIdAndUpdate( _id, {password: HashPassword(password)}) 
            res.status(200).json({
                success:true,
                updated_user: updated_user
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            msg: "Something wrong please try again"
        })
    }
}