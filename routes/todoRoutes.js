const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/create", todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/search", todoController.searchTodos);
router.get("/stats", todoController.getTodoStats);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.patch("/:id/status", todoController.updateTodoStatus);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
