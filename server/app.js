import express from "express";
import cors from "cors";
import callsRouter from "./routes/calls/index.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/calls", callsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});