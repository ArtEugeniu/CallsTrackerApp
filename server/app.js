import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import callsRouter from "./routes/calls/index.js";
import chatRouter from "./routes/chat/index.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


app.use("/api/calls", callsRouter);
app.use("/api/chat", chatRouter);


app.use((req, res, next) => {

  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  

  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Frontend not built');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});