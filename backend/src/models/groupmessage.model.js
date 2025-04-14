import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);
export default GroupMessage;
