const mongoose = require('mongoose')

// mongodb://127.0.0.1:27017/toDoLists
// mongodb+srv://nafilcookee:nafil@cluster0.eko4js7.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://nafilcookee:nafil@cluster0.eko4js7.mongodb.net/?retryWrites=true&w=majority').then((res)=>{
    console.log('Mongodb server connected succesfully with TodoList');
}).catch((err)=>{
    console.log(err);
})