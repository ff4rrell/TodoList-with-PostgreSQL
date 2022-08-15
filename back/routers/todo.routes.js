const Router = require("express");
const router = new  Router();
const todoControler = require("../controllers/todo.controllers");

router.post("/todo", todoControler.createTodo);
router.get("/todo", todoControler.getTodos);
router.get("/todo/:id", todoControler.getTodoById);
router.put("/todo", todoControler.updateTodoById);
router.delete("/todo/:id", todoControler.deleteTodoById);

module.exports = router;