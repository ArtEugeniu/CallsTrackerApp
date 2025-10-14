import { Router } from "express";
import { deleteCall } from "../../models/call.js";

const router = Router();

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteCall(id);
    res.json({ message: "Call deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
