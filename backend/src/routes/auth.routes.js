import express from "express";
import { checkAuth, login, signout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); 
router.post("/signout", signout);

router.put("/update-profile", protectRoute ,updateProfile); 

// Protected routes 
router.get("/check", protectRoute, checkAuth);

export default router;
