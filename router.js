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

router.get('/getbydate',toDoController.getToDoByDateController)

router.post('/status-update',toDoController.statusUpdaterController)

router.post('/pagination',toDoController.limitToDoContoller)

router.post('/get-one-todo',toDoController.getOneToDoController)

module.exports = router