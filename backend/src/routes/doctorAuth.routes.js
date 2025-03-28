import express from "express";
import { registerOrUpdateDoctor, getDoctorProfile } from "../controllers/doctorAuth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Register or Update Doctor Profile
router.post("/register-update", protectRoute, registerOrUpdateDoctor);

// ✅ Get Doctor Profile
router.get("/profile/:id", protectRoute, getDoctorProfile);

export default router;
