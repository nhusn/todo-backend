const todo = require("../Model/todoModel");

exports.addToListController = async (req, res) => {
  const { item } = req.body;
  const { _id } = req.payload;
  try {
    const existingToDo = await todo.findOne({ todo: item, userId: _id });
    if (existingToDo) {
      return res.status(404).json("todo already exist");
    }
    const newToDo = new todo({
      todo: item,
      userId: _id,
    });
    await newToDo.save();
    return res.status(200).json(newToDo);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.deleteToDoController = async (req, res) => {
  const { item } = req.body;
  const { _id } = req.payload;
  try {
    const result = await todo.deleteOne({ todo: item, userId: _id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.updateToDoController = async (req, res) => {
  const { item, _id } = req.body;
  const userDetails = req.payload;
  try {
    const result = await todo.updateOne(
      { _id, userId: userDetails._id },
      { todo: item }
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.getAllToDoController = async (req, res) => {
  const { _id } = req.payload;
  try {
    const result = await todo.find({ userId: _id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.getToDoByDateController = async (req, res) => {
  const { _id } = req.payload;
  try {
    const result = await todo.aggregate([
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
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.statusUpdaterController = async (req, res) => {
  const { id } = req.body;
  const { _id } = req.payload;
  try {
    const todoItem = await todo.findOne({ _id: id, userId: _id });
    todoItem.completed = !todoItem.completed;
    await todoItem.save();
    return res.status(200).json(todoItem);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.limitToDoContoller = async (req, res) => {
  const { page } = req.body;
  const { _id } = req.payload;
  console.log(_id);
  try {
    const skip = page * 5;
    const result = await todo.find({ userId: _id }).skip(skip).limit(5);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.getOneToDoController = async (req, res) => {
  const { _id } = req.body;
  const userDetails = req.payload
  try {
    const result = await todo.findOne({ _id,userId:userDetails._id });
    res.status(200).json(result.capitalizedTodo);
  } catch (error) {
    return res.status(401).json(error);
  }
};
