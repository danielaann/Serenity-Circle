import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteNote, editNote, getNotes, searchNote, sendNote, updateNotePin } from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/add-note",protectRoute,sendNote);
router.put("/edit-note/:noteId",protectRoute,editNote);
router.get("/get-all-notes",protectRoute,getNotes);
router.delete("/delete-note/:noteId",protectRoute,deleteNote);
router.put("/update-note-pinned/:noteId",protectRoute,updateNotePin);
router.get("/search-note",protectRoute,searchNote);

export default router;