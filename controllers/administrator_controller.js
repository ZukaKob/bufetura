const Food = require('../models/foods_model')
const Administrator = require('../models/bufetura_model')
const { CreateAdministratorToken, VerifyUser } = require('../utils/password_utils')
const cloudinary = require('../utils/cloudinary')


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
    const user = req.user
    if(user !== null) {
        
        const cloudinary_image = await cloudinary.uploader.upload(req.file.path, {folder: 'bufetura'})

        try {
            const created_food = new Food({
                bufetura_id: user,
                name: req.body.name,
                category: req.body.category,
                image: cloudinary_image.url,
                description: req.body.description,
                price: req.body.price 
            })

            await created_food.save()
            return res.json({
                success:true,
                created_food: created_food
            })
        } catch (error) {
            return res.json({
                success:false,
                msg: 'Something wrong try again later',
                error: error
            })
        }
    } else {
        res.status(400).json({success:false})
    }
}