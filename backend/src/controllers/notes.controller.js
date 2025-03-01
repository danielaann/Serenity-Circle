import Note from "../models/notes.model.js";

export const sendNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const user = req.user; // Get user from protectRoute middleware

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const note = new Note({
            title,
            content,
            tags: Array.isArray(tags) ? tags:[],    //Ensures tags is an array
            userId: user._id,
        });

        await note.save();

        res.status(201).json({note});
    } catch (error) {
        console.error("Error in sendNote controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const editNote = async (req,res) => {
    const noteId = req.params.noteId;
    const {title, content, tags, isPinned} = req.body;
    const user = req.user;
    
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: true, message: "Unauthorized: User not found" });
    }
    
    if (!title && !content && !tags){
        return res.status(400).json({error:true, message:"No changes provided"})
    }

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if (!note){
            return res.status.json({error:true, message:"Note not Found"});
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.json({error: false, note, message: "Note updated Successfully!"});

    } catch (error) {
        console.error("Error in editNote controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getNotes = async (req,res) => {
    const user = req.user;

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const notes = await Note.find({userId: user._id}).sort({isPinned: -1});

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully!"
        });

    } catch (error) {
        console.error("Error in getNotes controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteNote = async (req,res) => {
    const noteId = req.params.noteId;
    const user = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({error:true, message:"Note not found"});
        }

        await Note.deleteOne({_id: noteId, userId: user._id});
        return res.json({
            error:false,
            message:"Note deleted successfully!"
        });
        
    } catch (error) {
        console.error("Error in deleteNote controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateNotePin = async (req,res) => {
    const noteId = req.params.noteId;
    const {isPinned} = req.body;
    const user = req.user;
    
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: true, message: "Unauthorized: User not found" });
    }
    

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if (!note){
            return res.status.json({error:true, message:"Note not Found"});
        }

        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.json({error: false, note, message: "Note updated Successfully!"});

    } catch (error) {
        console.error("Error in editNote controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    };
};
