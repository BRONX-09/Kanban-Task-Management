const express = require("express");
const router = express.Router();
const taskCtrl = require("../controllers/taskController");

// Get all tasks for a column
router.get("/column/:columnId", taskCtrl.getTasksByColumn);

// Create a task
router.post("/", taskCtrl.createTask);

// Update a task
router.put("/:id", taskCtrl.updateTask);

// Delete a task
router.delete("/:id", taskCtrl.deleteTask);

module.exports = router;
