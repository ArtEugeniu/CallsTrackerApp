import { Router } from "express";
import { getCallById } from "../../models/call.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const call = await getCallById(id);
  if (!call) return res.status(404).json({ message: "Call not found" });
  res.json(call);
});

export default router;
