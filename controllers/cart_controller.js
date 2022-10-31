const Cart = require("../models/cart_model")
const Food = require("../models/foods_model")

exports.addItemToCart = async (req,res) => {
    const user = req.user 
    if(user) {

        try {

            const food = await Cart.findOne({food_id: req.params.food_id})
            console.log(food)

            if(food === null) {
                const create_cart = new Cart({
                    user_id: user,
                    food_id: req.params.food_id,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    total: req.body.total 
                })
        
                await create_cart.save()
                return res.status(200).json({create_cart})
            } else{
                res.status(400).json({
                    success:false,
                    msg: "Food is already added to cart"
                })
            }
        } catch (error) {
            return res.status(400).json({error: error})
        }

    } else {
        res.status(400).json({
            success:false,
            msg: "Something wrong"
        })
    }
}

exports.getCartItems = async (req,res) => {
    const user = req.user 
    if(user) {
        try {
                const user_cart = await Cart.find({user_id: user._id}) 
                if(user_cart !== null) {

                const cart = await Cart.find({user_id: user._id})   
                
                let food_id = []
                let counter = 0
                
                for(let item of cart) {
                    if(food_id.indexOf(item._id.toString()) === -1){
                        food_id.push(item.food_id.toString())
                        counter++
                    }
                }
                
                const result = await Food.find({
                    "_id": food_id
                })
                return res.json({result: result, cart: cart})
            } else {
                res.status(400).json({
                    msg: "No items in cart"
                })
            }
        } catch (error) {
            return res.status(400).json({
                success:false,
                msg: "Something wrong"
            })
        }
    } else {
        res.status(400).json({
            success:false,
            msg: "Something wrong"
        })
    }
}

exports.deleteCartItems  = async (req,res) => {
    const user = req.user 
    if(user) {
        try {
            const cart = await Cart.find({user_id: user._id})
            if(cart !== null) {
                const result = await Cart.deleteOne({food_id: req.params.food_id})
                res.status(200).json({
                    success:true,
                    result: result 
                })
            } else {
                res.status(400).json({success:false,
                msg: "User haven't created cart yet"})
            }
        } catch (error) {
            res.status(400).json({
                success:false,
                msg: "Somethign wrong try again"
            })
        }

    } else {
        res.status(400).json({
            success:false,
            msg: "Something wrong"
        })
    }
}