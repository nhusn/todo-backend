const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
    todo:{
        type:String
    }
})
const todos = mongoose.model("todos",toDoSchema)
module.exports = todos