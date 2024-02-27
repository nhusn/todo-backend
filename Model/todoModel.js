const { Schema, model } = require("mongoose");

const toDoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

toDoSchema.virtual("capitalizedTodo").get(function () {
  return this.todo.toUpperCase();
});

const todo = model("todo", toDoSchema);
module.exports = todo;
