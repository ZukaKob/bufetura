const Administrator = require('../models/bufetura_model')
const { CreateAdministratorToken } = require('../utils/password_utils')


// @Desc administrator login 
// @Route POST /api/v1/administrator/login 
// Access Public 
exports.LoginAdministrator = async (req,res) => {
    const {username,name,password} = req.body 
    if(username === "" || name === "" || password === "") {
        return res.status(400).json({
            success:false,
            msg: "Please input all fields"
        })
    }
    const admin = await Administrator.findOne({name: name}) 
    if(admin!==null) {
        if(name === admin.name && password === admin.password) {
            const token = await CreateAdministratorToken(admin.toJSON()) 
            return res.status(200).json({
                success:true,
                token: token 
            })
        } else {
            return res.status(400).json({
                success:false,
                msg: "Please input valid credentials"
            })
        }
    } else {
        return res.status(400).json({
            success:false,
            msg: "Incorrect name, please input a correct one"
        })
    }
}


// @Desc administrator add foods
// @Route POST /api/v1/administrator/add_food
// @Access Private
exports.AddFood = async (req,res) => {
    console.log(123)
}