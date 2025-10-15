import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
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

// Serve static files from public directory (built frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use("/api/calls", callsRouter);
app.use("/api/chat", chatRouter);

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Fallback handler for everything else
app.get('*', (req, res) => {
  // If it's an API route that wasn't handled, return 404
  if (req.url.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // For all other routes, serve the React app (SPA routing)
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not built. Run: cd client && npm run build');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
