const Todo = require("../models/todoModel");

const createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate, userId } = req.body;
    const todo = await new Todo({ title, description, priority, dueDate, userId }).save();
    res.status(201).json({ success: true, message: "Todo created successfully", data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, message: "Todo updated successfully", data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTodoStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, { status, isCompleted: status === "completed" }, { new: true });
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, message: "Status updated successfully", data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id});
    if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchTodos = async (req, res) => {
  try {
    const { keyword } = req.query;
    const todos = await Todo.find({ userId: req.user.id, title: { $regex: keyword, $options: "i" } });
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTodoStats = async (req, res) => {
  try {
    const total = await Todo.countDocuments({ userId: req.user.id });
    const completed = await Todo.countDocuments({ userId: req.user.id, status: "completed" });
    const pending = await Todo.countDocuments({ userId: req.user.id, status: "pending" });
    const inProgress = await Todo.countDocuments({ userId: req.user.id, status: "in-progress" });
    res.status(200).json({ success: true, data: { total, completed, pending, inProgress } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
  searchTodos,
  getTodoStats,
};
