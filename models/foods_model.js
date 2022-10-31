const {Schema, model, SchemaTypes} = require('mongoose') 

const FoodSchema = new Schema({
    bufetura_id: {type:SchemaTypes.ObjectId, ref: 'restaurant'},
    name:{type:String,required:true}, 
    category:{type:String,required:true},
    image: {type:String, default: 'none'},
    description: {type:String, required:true},
    price:{type:Number,required:true},
})

module.exports = model('food', FoodSchema) 

