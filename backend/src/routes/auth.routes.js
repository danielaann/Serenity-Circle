import express from "express";
import { checkAuth, login, signout, signup } from "../controllers/auth.controller.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";
import { bookApointment } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);

// 🔒 Restricted Routes (Only Authenticated Users)
router.get("/check", protectRoute, checkAuth);

// 🔒 Doctor-Only Access for Appointments
router.post("/book-appointment", protectRoute, authorizeRoles("doctor"), bookApointment);

export default router;
