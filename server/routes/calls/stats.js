import { Router } from "express";
import { getAllCalls } from "../../models/call.js";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const calls = await getAllCalls();

    const total = calls.length;
    const qualified = calls.filter(c => c.outcome === "qualified").length;
    const notQualified = calls.filter(c => c.outcome === "not_qualified").length;
    const missed = calls.filter(c => c.status === "missed").length;
    const completed = calls.filter(c => c.status === "completed").length;


    const totalDurationSec = calls.reduce((acc, c) => {
      if (!c.duration_seconds || typeof c.duration_seconds !== "string") return acc;
      const parts = c.duration_seconds.split(":").map(Number);
      if (parts.length !== 2 || parts.some(isNaN)) return acc;
      const [minutes, seconds] = parts;
      return acc + minutes * 60 + seconds;
    }, 0);

    const formatMMSS = (seconds) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const avgDurationSec = total > 0 ? Math.round(totalDurationSec / total) : 0;
    const avgDuration = formatMMSS(avgDurationSec);
    const totalDuration = formatMMSS(totalDurationSec);

    res.json({
      total,
      qualified,
      notQualified,
      missed,
      completed,
      avgDuration,
      totalDuration,
    });
  } catch (err) {
    console.error("Ошибка при получении статистики звонков:", err);
    res.status(500).json({ error: "Ошибка при получении статистики звонков" });
  }
});

export default router;