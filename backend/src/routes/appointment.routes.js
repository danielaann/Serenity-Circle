import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { bookAppointment } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/book-appointment", protectRoute, bookAppointment);

export default router;