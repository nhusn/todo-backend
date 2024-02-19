const { Schema, model } = require('mongoose')

const userSchema = Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = model("user",userSchema)
module.exports = user