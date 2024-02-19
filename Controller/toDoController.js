const todo = require("../Model/todoModel");

exports.addToListController = async (req, res) => {
  const { item } = req.body;
  try {
    const existingToDo = await todo.findOne({ todo: item });
    if (existingToDo) {
      return res.status(404).json("todo already exist");
    }
    const newToDo = new todo({
      todo: item,
    });
    await newToDo.save();
    return res.status(200).json(newToDo);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.deleteToDoController = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await todo.findByIdAndDelete({ _id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.updateToDoController = async (req, res) => {
  const { item, _id } = req.body;
  try {
    const result = await todo.updateOne({ _id }, { todo: item });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.getAllToDoController = async (req, res) => {
  try {
    const result = await todo.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.getToDoByDateController = async (req, res) => {
  try {
    const result = await todo.aggregate([
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
            year: {
              $year: "$createdAt",
            },
          },
          todos: {
            $push: "$$ROOT",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          "todos.todo": 1,
        },
      },
    ]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.statusUpdaterController = async (req, res) => {
  const { id } = req.body;
  try {
    const todoItem = await todo.findOne({ _id: id });
    todoItem.completed = !todoItem.completed;
    await todoItem.save();
    return res.status(200).json(todoItem);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.limitToDoContoller = async (req, res) => {
  const { page } = req.body;
  try {
    const skip = page * 5;
    const result = await todo.find().skip(skip).limit(5);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.getOneToDoController = async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await todo.findOne({ _id });
    res.status(200).json(result.capitalizedTodo);
  } catch (error) {
    return res.status(401).json(error);
  }
};
