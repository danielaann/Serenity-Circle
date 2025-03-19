import { protectRoute } from "../middleware/auth.middleware.js";
import  { addMood, getMonthlyMoods, getMoods, getWeeklyMoods, getYearlyMoods,  } from "../controllers/mood.controller.js"
import express from "express";

const router = express.Router();

router.post("/add",protectRoute, addMood);
router.get("/get-moods",protectRoute, getMoods);
router.get("/yearly",protectRoute, getYearlyMoods);
router.get("/monthly/:month/:year",protectRoute, getMonthlyMoods);
router.get("/weekly/:startDate",protectRoute,getWeeklyMoods);

export default router; 