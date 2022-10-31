const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food'
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1']
    },
    price: {
        type:Number,
        required:true
    },
    total: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('cart', CartSchema)
