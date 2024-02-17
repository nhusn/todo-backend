const { Schema, model } = require("mongoose");
const moment = require("moment-timezone");

const date = new Date().toLocaleDateString("sv-SE");

const toDoSchema = new Schema(
  {
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
