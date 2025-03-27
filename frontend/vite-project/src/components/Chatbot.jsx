'use client'

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./shared/Navbar";

const predefinedQuestions = [
  "What is the portal about?",
  "How can I apply for a job?",
  "Can I receive notifications for new jobs?",
  "How do I search for jobs?",
  "How do I update my resume?",
  "How can I check the status of my application ?",
  "What types of jobs are listed?",
  "How do I update my profile?"
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const newMessages = [...messages, { text: query, sender: "user" }];
    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/chatbot", { query });
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error getting response", sender: "bot" }]);
    }
    setLoading(false);
  };

  const handlePredefinedQuestion = (question) => {
    setQuery(question);
    sendMessage();
  };

  const resetChat = () => {
    setMessages([]);
    setQuery("");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{ background: `url('https://cdn.pixabay.com/photo/2023/01/15/17/44/robot-7720802_640.jpg') no-repeat center center/cover` }}
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-4xl shadow-xl rounded-2xl bg-white p-6 bg-opacity-10 flex">
          <CardContent className="w-full flex gap-6">
            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
              <h2 className="text-xl font-semibold text-white text-center mb-4">Chatbot Assistance</h2>
              <div className="h-96 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`my-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <span
                      className={`px-4 py-2 rounded-lg text-sm break-words max-w-[80%] ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-grow border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {loading ? "..." : "Send"}
                </Button>
                <Button
                  onClick={resetChat}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Predefined Questions */}
            <div className="w-1/3 flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-3">Suggested Questions</h3>
              <div className="flex-grow overflow-y-auto bg-gray-50 rounded-lg border border-gray-300 p-3">
                <div className="space-y-2">
                  {predefinedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedQuestion(question)}
                      className="w-full text-left px-3 py-2 text-sm bg-white hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out shadow-sm border border-gray-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
