import express from "express";
import { getGroupMessages, sendGroupMessage } from "../controllers/groupmessage.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/get-grpmsg", protectRoute, getGroupMessages);
router.post("/send-grpmsg", protectRoute, sendGroupMessage);

export default router;
