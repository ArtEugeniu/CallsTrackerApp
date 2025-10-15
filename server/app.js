import express from "express";
import cors from "cors";
import callsRouter from "./routes/calls/index.js";
import chatRouter from "./routes/chat/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/calls", callsRouter);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});