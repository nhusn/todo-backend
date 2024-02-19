const express = require("express");
const toDoController = require("./Controller/toDoController");
const userController = require("./Controller/userController");
const jwtMiddleware = require('./Middlewares/jwtMiddleware')

const router = new express.Router();

router.get("/message", (req, res) => {
  const num = Math.floor(Math.random() * 100);
  return res.status(200).json(num);
});

// add to list
router.post("/add",jwtMiddleware,toDoController.addToListController);

// delete from todo
router.post("/delete",jwtMiddleware, toDoController.deleteToDoController);

// update item from list
router.post("/update",jwtMiddleware, toDoController.updateToDoController);

// get all list
router.get("/all-todos",jwtMiddleware, toDoController.getAllToDoController);

// get list by date
router.get("/getbydate",jwtMiddleware, toDoController.getToDoByDateController);

// update status of list item
router.post("/status-update",jwtMiddleware, toDoController.statusUpdaterController);

// get list by limit 5
router.post("/pagination",jwtMiddleware, toDoController.limitToDoContoller);

// get todo by capitalised text
router.post("/get-one-todo",jwtMiddleware, toDoController.getOneToDoController);

// user registration
router.post('/registration',userController.userRegisterController)

// login user
router.post('/login',userController.loginController)

module.exports = router;
