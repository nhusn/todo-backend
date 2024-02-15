const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://nafilcookee:nafil@cluster0.eko4js7.mongodb.net/?retryWrites=true&w=majority').then((res)=>{
    console.log('Mongodb server connected succesfully with TodoList');
}).catch((err)=>{
    console.log(err);
})