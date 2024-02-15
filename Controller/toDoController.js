const todos = require('../Model/todoSchema')

exports.addToListController = async (req,res) => {
    const {todo} = req.body
    try {
        const existingToDo = await todos.findOne({todo})
        if(existingToDo){
            return res.status(404).json("todo already exist")
        }else{
            const newToDo = new todos({
                todo
            })
            await newToDo.save()
            return res.status(200).json(newToDo)
        }
        
    } catch (error) {
        return res.status(401).json(error);
    }
}

exports.deleteToDoController = async (req,res) => {
    const {todo} = req.body
    console.log(todo);
    try {
        const result = await todos.deleteOne({todo})
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.updateToDoController = async (req,res) => {
    const {todo,updatedTodo} = req.body
    try {
        const result = await todos.updateOne({todo},{todo:updatedTodo})
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllToDoController = async (req,res) => {
    try {
        const result = await todos.find({},{todo:1,_id:0})
        return res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}