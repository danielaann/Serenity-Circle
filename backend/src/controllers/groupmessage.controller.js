import GroupMessage from "../models/groupmessage.model.js";

export const getGroupMessages = async (req, res) => {
    try {
      const messages = await GroupMessage.find().populate("senderId", "fullName");  
      res.status(200).json(messages);
    //   console.log("Fetched group messages:", messages);
    } catch (error) {
      console.error("Error fetching group messages:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const sendGroupMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const senderId = req.user._id;

    const newMessage = new GroupMessage({ senderId, text });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending group message:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
