const {Schema, model, SchemaTypes} = require('mongoose') 

const BufeturaSchema = new Schema({

    username:{type:String,required:true},
    password:{tyep:String,required:true},
    name: {type:String,required:true},
    address:{type:String,required:true},
    // foods: [{
    //     type: SchemaTypes.ObjectId,
    //     ref: 'food'
    // }],
    // coverImages: {type:[String]}

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password,
            delete ret.createdAt,
            delete ret.updatedAt,
            // delete ret.coverImages,
            // delete ret.foods,
            delete ret.address,
            delete ret.username
        }
    }, timestamps: true 
}) 

module.exports = model('restaurant', BufeturaSchema) 