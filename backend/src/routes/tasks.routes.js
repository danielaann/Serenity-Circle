import express from "express";
import { createTask, deleteTask, getTasks, updateTask, viewTask } from "../controllers/tasks.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",protectRoute,createTask);
router.get("/get-all-task",protectRoute,getTasks);
router.get("/get-task/:taskId",protectRoute,viewTask);
router.put("/update-task/:taskId",protectRoute,updateTask);
router.delete("/delete-task/:taskId",protectRoute,deleteTask);

export default router;