const {Schema, model, SchemaTypes} = require('mongoose') 

const BufeturaSchema = new Schema({

    username:{type:String,required:true},
    password:{type:String,required:true},
    name: {type:String,required:true,unique:true}

}, {
    // toJSON: {
    //     transform(doc, ret) {
    //         // delete ret.password,
    //         // delete ret.createdAt,
    //         // delete ret.updatedAt,
    //         // delete ret.coverImages,
    //         // delete ret.foods,
    //         // delete ret.address,
    //         // delete ret.username
    //     }
    // },
    timestamps: true 
}) 

module.exports = model('restaurant', BufeturaSchema) 