const express = require("express");
const router = express.Router();
const columnCtrl = require("../controllers/columnController");

// Get all columns for a board
router.get("/board/:boardId", columnCtrl.getColumnsByBoard);

// Create a column
router.post("/", columnCtrl.createColumn);

// Update a column
router.put("/:id", columnCtrl.updateColumn);

// Delete a column
router.delete("/:id", columnCtrl.deleteColumn);

module.exports = router;
