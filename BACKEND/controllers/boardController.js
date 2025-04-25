const Board = require("../models/boards");

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate({
      path: "columns",
      populate: {
        path: "tasks",
        model: "Task",
      },
    });
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate({
      path: "columns",
      populate: {
        path: "tasks",
        model: "Task",
      },
    });
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const updated = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
