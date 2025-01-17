import User from '../models/user.model.js';
import Message from "../models/message.model.js"

export const getUsersForSidebar = async (req, res)=>{
    try{
        const loggedInUserId =req.user._id;
        const fillteredusers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");   //fetch all user except for the one whivh has same as the person and select all info excep password.

        res.status(200).json(fillteredusers);

    }catch (error){

        console.error("Error in getusersforSidebar:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMessages =async (req,res) =>{
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;  

        const messages = await Message.find({                //find all messages sent from me to chat person ad vice versa
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages);

    }catch (error){
        console.error("Error in getMessages controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
};

export const sendMessage = async (req,res) =>{
    try{
        const {text} = req.body;
        const{ id: receiverId} = req.params;
        const senderId = req.user._id;

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
        });

        await newMessage.save();

        res.status(201).json(newMessage)

    }catch (error){
        console.error("Error in sendMessage controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}