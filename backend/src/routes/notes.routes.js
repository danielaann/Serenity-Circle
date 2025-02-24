import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { editNote, sendNote } from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/add-note",protectRoute,sendNote);
router.put("/edit-note/:noteId",protectRoute,editNote);

export default router;