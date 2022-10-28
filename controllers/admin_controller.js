const Bufetura = require("../models/bufetura_model")
const User = require('../models/user_model')
const Food = require('../models/foods_model')

// @Desc admin creates vandor 
// @Route POST /admin/create_bufetura 
// @Access PRIVATE
exports.CreateAdministrator = async (req,res) => {
    
    const { username, password, name, address} = req.body 
    const new_bufetura_user = new Bufetura({
        username: username,
        password: password, 
        name: name,
        address: address
    })

    try {
        await new_bufetura_user.save() 
        res.status(200).json({success:true, bufetura: new_bufetura_user})
    } catch (error) {
        res.status(400).json({
            success:false, 
            msg: "Something wrong, try again later"
        })
    }  
}

// @Desc admin gets administratos informations 
// @Route POST /admin/get_administratos 
// @Access PRIVATE
exports.GetAllAdministrator = async (req,res) => {
    try {
        const administratos = await Bufetura.find().lean()
        return res.status(200).json({
            success:true,
            administratos: administratos
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg: "Something wron, try again later"
        })
    }
}
// @Desc admin get administrator with username
// @Route GET /admin/get_administrato/:username
// @Access PRIVATE
exports.GetAdministrator = async (req,res) => {
    try {
        const administrator = await Bufetura
        .find({username:req.params.username})
        return res.status(200).json({
            success:true,
            admin: administrator
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg: "Something wron, try again later"
        })
    }
}

// @Desc admin get all user
// @Route GET /api/v1/admin/get_users
// @Access PRIVATE 
exports.GetAllUser = async (req,res) => {
    try {
        const users = await User.find().lean()
        return res.status(200).json({
            success:true,
            users: users
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg: "Something is wrong, try again"
        })
    }
}
// @Desc admin get user
// @Route GET /admin/get_user/:email
// @Access PRIVATE
exports.GetUser = async (req,res) => {
    try {
        const user = await User
        .find({emai: req.params.email})
        return res.status(200).json({
            success:true,
            user_details: user 
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg: "Something is wrong. try again"
        })
    }
}

// @Desc admin get all food details 
// @Router GET /admin/get_foods 
// @Access PRIVATE 
exports.GetFoods = async (req,res) => {
    try {
        const foods = await Food.find().lean()
        return res.status(200).json({
            success:true,
            foods: foods 
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg: "Something is worng, try agian"
        })
    }
}
// @Desc admin get food detail with name 
// @Route GET /admin/food/:name 
// @Access PRIVATE
exports.GetFoodWithName = async (req,res) => {
    try {
        const food = await Food.find({
            name: req.params.name
        })
        return res.status(200).json({
            success:false,
            food: food 
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg: "Something wrong, try again"
        })
    }
}