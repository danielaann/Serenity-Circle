import express from "express";
import { createSleepLog, getSleepLogs } from "../controllers/sleep.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-sleep", protectRoute, createSleepLog);
router.get("/get-sleep", protectRoute, getSleepLogs);

export default router;