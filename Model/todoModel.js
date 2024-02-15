const {Schema,model} = require('mongoose')

const toDoSchema = new Schema({
    todo:{
        type:String
    }
},{ timestamps: true})

const todo = model("todo",toDoSchema)
module.exports = todo