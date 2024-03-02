const todo = require("../Model/todoModel");

exports.addToListController = async (req, res) => {
  const todoItem = req.body;
  const userId = req.userDetails._id;
  try {
    const isAdded = await updateOrAdd(todoItem, userId);
    return res.status(200).json(isAdded);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.deleteToDoController = async (req, res) => {
  const { item } = req.body;
  const { _id } = req.userDetails;
  try {
    const deletedTodo = await todo.deleteOne({ todo: item, userId: _id });
    return res.status(200).json(deletedTodo);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.updateToDoController = async (req, res) => {
  const todoItem = req.body;
  const userId = req.userDetails._id;

  try {
    const isUpdated = await updateOrAdd(todoItem, userId);
    return res.status(200).json(isUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAllToDoController = async (req, res) => {
  const { _id } = req.userDetails;
  try {
    const allTodos = await todo.find({ userId: _id });
    return res.status(200).json(allTodos);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getToDoByDateController = async (req, res) => {
  const { _id } = req.userDetails;
  try {
    const todoByDate = await todo.aggregate([
      {
        $match: {
          userId: {
            $eq: _id,
          },
        },
      },
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
    return res.status(200).json(todoByDate);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.statusUpdaterController = async (req, res) => {
  const { id } = req.body;
  const userDetails = req.userDetails;
  try {
    const todoItem = await todo.findOne({ _id: id, userId: userDetails._id });
    todoItem.completed = !todoItem.completed;
    await todoItem.save();
    return res.status(200).json(todoItem);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.limitToDoContoller = async (req, res) => {
  const { page } = req.body;
  const { _id } = req.userDetails;
  try {
    const skip = page * 5;
    const todoPagination = await todo.find({ userId: _id }).skip(skip).limit(5);
    return res.status(200).json(todoPagination);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getOneToDoController = async (req, res) => {
  const { _id } = req.body;
  const userDetails = req.userDetails;
  try {
    const oneTodo = await todo.findOne({ _id, userId: userDetails._id });
    res.status(200).json(oneTodo.capitalizedTodo);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateOrAdd = async (toDoDetails, userId) => {
  const newTodo = await todo.updateOne(
    toDoDetails._id ? { _id: toDoDetails._id } : { userId, todo: toDoDetails.item },
    { userId, todo: toDoDetails.item },
    { upsert: true }
  );
  return newTodo;
};

//  ? { _id: toDoDetails._id, userId: userDetails._id  }
// : { userId, todo: toDoDetails.item },
