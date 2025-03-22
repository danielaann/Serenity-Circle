import express from "express";
import { doctorSignup, doctorLogin, checkDoctorAuth, doctorSignout } from "../controllers/doctorAuth.controller.js";
import protectDoctorRoute  from "../middleware/doctorAuth.middleware.js";

const router = express.Router();

router.post("/signup",doctorSignup);
router.post("/login", doctorLogin);
router.post("/signout",doctorSignout);

router.get('/protected',protectDoctorRoute,checkDoctorAuth);

export default router;
