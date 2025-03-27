import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Ensure it's an array

  const userId = "user123"; // Get from authentication state
  const chatWithId = "recruiter456"; // Get from job details

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/chat/messages", {
          params: { userId, chatWithId },
        });
  
        setMessages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };
  
    fetchMessages();
  }, [userId, chatWithId]);
  
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post("http://localhost:8000/api/chat/send", {
          sender: userId,
          receiver: chatWithId,
          message,
        });
  
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  

  return (
    <div className="chat-container">
      <h2>Chat with Recruiter</h2>
      <div className="messages">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className={`message ${msg.sender === userId ? "sent" : "received"}`}>
              {msg.message}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
