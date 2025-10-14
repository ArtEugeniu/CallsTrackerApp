import { Router } from "express";
import { getCallsPaginated, getCallsCount } from "../../models/call.js";

const router = Router();

router.get("/", async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;


    const [calls, total] = await Promise.all([
      getCallsPaginated(limit, offset),
      getCallsCount(),
    ]);

    res.json({
      calls,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Ошибка при получении звонков:", err);
    res.status(500).json({ error: "Ошибка при получении звонков" });
  }
});

export default router;