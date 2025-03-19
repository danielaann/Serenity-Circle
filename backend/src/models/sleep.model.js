const mongoose = require("mongoose");

const SleepSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    hoursSlept: {
        type: Number,
        required: true
    },

    sleepQuality: {
        type: String,
        enum: ["poor", "average", "good"],
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const SleepModel = mongoose.model("Sleep", SleepSchema);
export default SleepModel;
