import { Router } from "express";
import { createCall } from "../../models/call.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const newCall = await createCall(req.body);
    res.status(201).json(newCall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
