const { Schema, model} = require('mongoose') 

const UserSchema = Schema({

    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verified:{type:Boolean,default:false},
    isAdmin:{type:Boolean, default:false}

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password,
            delete ret.verified
        }
    },
    timestamps:true
})

module.exports = model('user', UserSchema) 