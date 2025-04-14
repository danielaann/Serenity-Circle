import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../lib/axios.js";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get("/group/get-grpmsg");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages:", err.message);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await axiosInstance.post("/group/send-grpmsg", { text });
      setText("");
      await fetchMessages(); // Fetch after send
      scrollToBottom();
    } catch (err) {
      console.error("Failed to send message:", err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("chat-user"));
    if (userData) {
      setCurrentUserId(userData._id);
    }

    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-base-100 flex items-center justify-center mt-3 p-4 w-[80%] ">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col h-[600px]">
        <div className="p-4 border-b bg-accent rounded-t-2xl">
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <span className="text-3xl">🌐</span> Global Group Chat
          </h2>
          <p className="text-sm text-slate-800">Connect with everyone in the group!</p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              No messages yet. Start the conversation!
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.senderId._id === currentUserId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow-sm transition-all duration-200 ${
                      msg.senderId._id === currentUserId
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {msg.senderId.fullName || msg.senderId.name}
                      </span>
                    </div>
                    <p className="mt-1">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
