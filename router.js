const express = require('express')
const toDoController = require('./Controller/toDoController')

const router = new express.Router()


router.get("/message",(req,res)=>{
    const num = Math.floor(Math.random()*100) 
    return res.status(200).json(num)
});

// add to list
router.post("/add",toDoController.addToListController)

// delete from todo
router.post('/delete',toDoController.deleteToDoController)

// update item from list
router.post('/update',toDoController.updateToDoController)

// get all list 
router.get('/all-todos',toDoController.getAllToDoController)

// get list by date
router.get('/getbydate',toDoController.getToDoByDateController)

// update status of list item
router.post('/status-update',toDoController.statusUpdaterController)

// get list by limit 5
router.post('/pagination',toDoController.limitToDoContoller)

// get todo by capitalised text
router.post('/get-one-todo',toDoController.getOneToDoController)

module.exports = router