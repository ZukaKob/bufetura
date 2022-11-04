const Food = require('../models/foods_model')
const Order = require('../models/order_model')

// @Desc User gets food
// @Route POST /api/v1/user/foods
// @Access Private
exports.UserGetFoods = async (req,res) => {
    const user = req.user 
    if(user !== null) {
        try {
            const foods = await Food.find().lean()
            return res.status(200).json({
                success:true,
                data: foods
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                msg: "Something wrong please try again"
            })
        }
    } else {
        res.status(400).json({
            success:false,
            msg: "Somethign wrong please try again"
        })
    }

}

// @Desc User gets food
// @Route POST /api/v1/user/foods
// @Access Private
exports.UserCreateOrder = async (req,res) => {
    const user = req.user 
    if(user !== null) {
        try {

            const new_order = await new Order({
                user: user,
                items: req.body.items,
                totalPrice: req.body.totalPrice,
                pending: req.body.pending 
            })

            await new_order.save()

            res.status(200).json({
                success:true,
                order: new_order
            })

        } catch (error) {
            return res.status(400).json({
                success:false,
                msg: "Something wrong plaease try again"
            })
        }
    } else {
        res.status(400).json({
            success:false,
            msg: "Something wrong please try again"
        })
    }

}

// @Desc User gets finished orders
// @Route GET /api/v1/user/finished_orders
// @Access Private
exports.UserGetFinishedOrders = async(req,res) => {
    const user = req.user 
    if(user!==null) {
        try {
            
            const orders = await Order.find({
                user: user._id
            })
            const finished_orders = orders.map(order => {
                if(order.finished) return order 
            })
            
            res.status(200).json({
                success:true,
                finished_orders: finished_orders
            })

        } catch (error) {
            res.status(400).json({
                success:false,
                msg: "Something wrong try again"
            })
        }
    } else {
        res.status(400).json({success:false, msg: "Something wrong try again"})
    }
}

// @Desc User gets pending orders
// @Route GET /api/v1/user/pending_orders
// @Access Private
exports.UserGetsPendingOrders = async(req,res) => {
    const user = req.user 
    if(user!==null) {
        try {
            const orders = await Order.find({
                user: user._id
            })
            const pending_orders = orders.map(order => {
                if(order.pending) return order 
            })
            
            res.status(200).json({
                success:true,
                pending_orders: pending_orders
            })
        } catch (error) {
            res.status(400).json({
                success:false,
                msg: "Something wrong please try again"
            })
        }
    } else {
        res.status(400).json({
            success:false,
            msg: "Something wrong try again"
        })
    }
}

// @Desc User gets notifications
// @Route GET /api/v1/user/notifications
// @Access Private
exports.UserGetsNotifications = async (req,res) => {
    console.log(123)
}
