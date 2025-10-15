import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { createCall, getAllCalls, updateCall } from "../../models/call.js";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const secondsToMMSS = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const prompt = `
Ты ассистент по звонкам.
Когда пользователь просит добавить, обновить или получить статистику звонков,
выполняй действия на сервере, но всегда отвечай дружелюбно и в разговорной форме.
Не показывай JSON пользователю.
Примеры:
- "Конечно, я добавил звонок с номером +40723456789."
- "Готово! Звонок помечен как выполненный."
- "Вот статистика ваших звонков: ..."

Если пользователь даёт данные в секундах, преобразуй их в mm:ss.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message },
      ],
    });


    const gptMessage = response.choices[0].message?.content || "Извините, я не понял запрос.";

    let actionData = null;
    try {
      const match = gptMessage.match(/\{[\s\S]*\}/);
      if (match) {
        actionData = JSON.parse(match[0]);
      }
    } catch (err) {

    }

    if (actionData?.action) {
      switch (actionData.action) {
        case "addCall":
          if (typeof actionData.data.duration_seconds === "number") {
            actionData.data.duration_seconds = secondsToMMSS(actionData.data.duration_seconds);
          }
          await createCall(actionData.data);
          break;
        case "updateCall":
          await updateCall(actionData.data.id, actionData.data);
          break;
        case "getStats":
          const calls = await getAllCalls();
          const totalDurationSec = calls.reduce((acc, c) => {
            const [min, sec] = c.duration_seconds.split(":").map(Number);
            return acc + (min * 60 + sec);
          }, 0);
          const avgDurationSec = calls.length ? Math.round(totalDurationSec / calls.length) : 0;
          gptMessage += `\nВсего звонков: ${calls.length}, средняя длительность: ${secondsToMMSS(avgDurationSec)}, общая длительность: ${secondsToMMSS(totalDurationSec)}`;
          break;
      }
    }

    res.json({ success: true, reply: gptMessage });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Error communicating with OpenAI" });
  }
});

export default router;
