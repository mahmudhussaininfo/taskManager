import express from "express";
import * as UsersController from "../app/controlleres/UsersController.js";
import * as TaskController from "../app/controlleres/TaskController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

//router init
const router = express.Router();

//users routes
router.post("/registration", UsersController.register);
router.post("/login", UsersController.login);
router.get("/profile-details", AuthMiddleware, UsersController.profileDetails);
router.post("/profile-update/:id", UsersController.profileUpdate);
router.post(
  "/profile-update",
  AuthMiddleware,
  UsersController.profileUpdateWithHeders
);
router.get("/emailVerify/:email", UsersController.emailVerify);
router.post("/resetPassword", UsersController.resetPassword);

//task routes
router.post("/create-task", AuthMiddleware, TaskController.createTask);
router.get(
  "/update-task/:id/:status",
  AuthMiddleware,
  TaskController.updateTask
);
router.get(
  "/tasklistStatus/:status",
  AuthMiddleware,
  TaskController.taskListByStatus
);
router.get("/delete-task/:id", AuthMiddleware, TaskController.deleteTask);
router.get("/task-count", AuthMiddleware, TaskController.countTasks);

//export
export default router;
