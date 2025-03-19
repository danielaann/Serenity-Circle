import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    mood: {
        type: String,
        enum: ["happy", "sad", "neutral", "stressed", "angry"],
        required: true
    },

    moodEmoji: { 
        type: String, 
        required: true // Store emoji representation of moods
    },

    note: {
        type: String
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});

const MoodModel = mongoose.model("Mood", MoodSchema);
export default MoodModel;