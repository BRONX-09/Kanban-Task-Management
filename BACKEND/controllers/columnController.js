const Column = require("../models/columns");

exports.createColumn = async (req, res) => {
  try {
    const column = await Column.create(req.body);
    res.status(201).json(column);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getColumnsByBoard = async (req, res) => {
  try {
    const columns = await Column.find({ board: req.params.boardId }).populate(
      "tasks"
    );
    res.status(200).json(columns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateColumn = async (req, res) => {
  try {
    const column = await Column.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(column);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteColumn = async (req, res) => {
  try {
    await Column.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
