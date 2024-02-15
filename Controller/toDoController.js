const todo = require('../Model/todoModel')

exports.addToListController = async (req,res) => {
    const {item} = req.body
    try {
        const existingToDo = await todo.findOne({todo:item})
        if(existingToDo){
            return res.status(404).json("todo already exist")
        }
        const newToDo = new todo({
            todo:item
        })
        await newToDo.save()
        return res.status(200).json(newToDo)
        
        
    } catch (error) {
        return res.status(401).json(error);
    }
}

exports.deleteToDoController = async (req,res) => {
    const {_id} = req.body
    try {
        const result = await todo.deleteOne({_id})
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}

exports.updateToDoController = async (req,res) => {
    const {item,_id} = req.body
    try {
        const result = await todo.updateOne({_id},{todo:item})
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}

exports.getAllToDoController = async (req,res) => {
    try {
        const result = await todo.find()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json(error)
    }
}