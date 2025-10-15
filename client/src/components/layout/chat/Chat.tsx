import React, { useState } from "react";
import Message from "./Message";
import useChat from "../../../hooks/useChat";
import "./Chat.scss";

const Chat: React.FC = () => {
  const { messages, sendMessage, loading } = useChat();
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      <h2>Chat with CallGPT</h2>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <Message key={idx} role={msg.role} content={msg.content} />
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrie comanda..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;