const {Schema, model, SchemaTypes} = require('mongoose') 


const OrderSchema = new Schema({
    user: {type:SchemaTypes.ObjectId, ref: 'user'},
    time:{type:Date, default: Date.now},
    price:{type:Number, required:true},
    foods:{type: [String]}, 
    
    declined:{type:Boolean, default:false},
    pending:{type:Boolean,default:true},
    finished:{type:Boolean,default:false},
    accepted:{type:Boolean,default: false}
})

module.exports = model('order', OrderSchema)