const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    columns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Column" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", BoardSchema);
