const express = require("express");
const router = express.Router();
const boardCtrl = require("../controllers/boardController");

router.get("/", boardCtrl.getAllBoards);
router.get("/:id", boardCtrl.getBoardById);
router.post("/", boardCtrl.createBoard);
router.put("/:id", boardCtrl.updateBoard);
router.delete("/:id", boardCtrl.deleteBoard);

module.exports = router;
