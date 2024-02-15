const express = require('express')
const toDoController = require('./Controller/toDoController')

const router = new express.Router()


router.get("/message",(req,res)=>{
    const num = Math.floor(Math.random()*100) 
    return res.status(200).json(num)
});

router.post("/add",toDoController.addToListController)

router.post('/delete',toDoController.deleteToDoController)

router.post('/update',toDoController.updateToDoController)

router.get('/all-todos',toDoController.getAllToDoController)

module.exports = router