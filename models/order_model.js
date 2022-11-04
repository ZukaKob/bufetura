const {Schema, model,} = require('mongoose') 


const OrderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [
        {
            _id: {type:String, required:true},
            quantity: {type:Number, required:true},
        }
    ],
    totalPrice: {
        type: Number,
        required:true
    },
    declined:{
        type:Boolean,
        default:false
    },
    pending:{
        type:Boolean,
        default:true
    },
    finished:{
        type:Boolean,
        default:false
    },
    accepted:{
        type:Boolean,
        default: false
    }

}, {
    timestamps: true 
})

module.exports = model('order', OrderSchema)