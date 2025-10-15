import { useState } from "react";
import type { Message } from "../types/call";

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      let responseText = "";
      if (data.response) {
        responseText = data.response;
      } else if (data.reply) {
        responseText = data.reply;
      } else if (data.calls) {
        responseText = Array.isArray(data.calls) ? 
          `Found ${data.calls.length} calls` : 
          JSON.stringify(data.calls, null, 2);
      } else if (data.stats) {
        responseText = typeof data.stats === 'string' ? 
          data.stats : 
          JSON.stringify(data.stats, null, 2);
      } else if (data.error) {
        responseText = `Error: ${data.error}`;
      } else {
        responseText = "No response received";
      }

      const assistantMessage: Message = { role: "assistant", content: responseText };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "Error connecting to server" }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}
