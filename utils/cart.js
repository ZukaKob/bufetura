const Cart = require('../models/cart_model')

exports.Cart = async () => {
    const carts = await Cart.find().populate({
        path: 'items.productId',
        select: 'name price'
    })
    return carts[0]
} 

exports.AddItem = async payload => {
    const newItem = await Cart.create(payload)
    return newItem 
}