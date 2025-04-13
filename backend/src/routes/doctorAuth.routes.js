import express from "express";
import { registerOrUpdateDoctor, getDoctorProfile, getAllDoctors } from "../controllers/doctorAuth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Register or Update Doctor Profile
router.post("/register-update", protectRoute, registerOrUpdateDoctor);

// ✅ Get Doctor Profile
router.get("/profile/:id", protectRoute, getDoctorProfile);

router.get('/get-doctors',protectRoute,getAllDoctors);
export default router;
