const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");
const studentController = require("../controllers/studentController");
const todoController = require("../controllers/todoController");

router.get("/groups", groupController.getGroups);
router.post("/groups", groupController.createGroup);
router.delete("/groups/:groupId", groupController.deleteGroup);

router.post(
  "/groups/:groupId/students",
  studentController.addStudent
);

router.delete(
  "/groups/:groupId/students/:studentId",
  studentController.removeStudent
);

router.post(
  "/groups/:groupId/students/:studentId/todos",
  todoController.addTodo
);

router.delete(
  "/groups/:groupId/students/:studentId/todos/:todoId",
  todoController.removeTodo
);

router.patch(
  "/groups/:groupId/students/:studentId/todos/:todoId",
  todoController.toggleTodo
);

module.exports = router;
