import { Router } from "express";
import chatRouter from "./chat.js"; 

const router = Router();
router.use("/", chatRouter); 

export default router;