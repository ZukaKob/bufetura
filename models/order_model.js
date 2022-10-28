const {Schema, model, SchemaTypes} = require('mongoose') 


const OrderSchema = new Schema({
    user: {type:SchemaTypes.ObjectId, ref: 'user'},
    time:{type:Date, default: Date.now},
    price:{type:Number, required:true},
    foods:{type: [String]} 
})

module.exports = model('order', OrderSchema)