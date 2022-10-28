const {Schema, model} = require('mongoose') 

const FoodSchema = new Schema({
    name:{type:String,required:true}, 
    category:{type:String,required:true},
    image: {type:String, default: 'none'},
    description: {type:String, required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})

module.exports = model('food', FoodSchema) 

