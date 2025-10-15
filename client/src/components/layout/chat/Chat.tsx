import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import useChat from "../../../hooks/useChat";
import "./Chat.scss";

const Chat: React.FC = () => {
  const { messages, sendMessage, loading } = useChat();
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat">
      <h2 className="chat__header">Chat with CallGPT</h2>
      
      <div className="chat__messages">
        {messages.map((msg, idx) => (
          <Message key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="chat__loading">
            AI is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__input-wrapper">
        <input
          className="chat__input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Try: 'Add call +40123456789, John Doe, 10min, completed' or 'Show today calls'"
          disabled={loading}
        />
        <button 
          className="chat__send-button" 
          onClick={handleSend} 
          disabled={loading || !input.trim()}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;