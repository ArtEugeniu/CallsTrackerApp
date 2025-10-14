import { Router } from "express";
import { updateCall } from "../../models/call.js";

const router = Router();

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedCall = await updateCall(id, req.body);
    res.json(updatedCall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
