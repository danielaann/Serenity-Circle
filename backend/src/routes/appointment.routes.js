import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { bookAppointment, getDoctorAppointments, getUserAppointments } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/book-appointment", protectRoute, bookAppointment);
router.get('/appointments/:userId', protectRoute, getUserAppointments);

router.get('/doctor/appointments',protectRoute,getDoctorAppointments);


export default router;