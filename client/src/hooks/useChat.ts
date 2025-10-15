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

      const data = await res.json();

      const gptReply = data.reply || data.calls || data.stats || "No response";
      const assistantMessage: Message = { role: "assistant", content: JSON.stringify(gptReply, null, 2) };
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
