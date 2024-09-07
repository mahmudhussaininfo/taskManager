import express from "express";
import * as UsersController from "../app/controlleres/UsersController.js";
import * as TaskController from "../app/controlleres/TaskController.js";

//router init
const router = express.Router();

//users routes
router.post("/registration", UsersController.register);
router.post("/login", UsersController.login);

//task routes
router.post("/create-task", TaskController.createTask);
router.post("/update-task", TaskController.updateTask);
router.post("/delete-task", TaskController.deleteTask);

//export
export default router;
