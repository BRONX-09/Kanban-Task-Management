const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { _id: false }
);

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Todo", "Doing", "Done", ""],
      default: "Todo",
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    subtasks: [SubtaskSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
