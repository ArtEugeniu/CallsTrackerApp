import express from 'express';
import { processChatMessage } from './chatController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await processChatMessage(message);
    res.json({ success: true, reply: response });

  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ 
      error: 'A apărut o eroare în procesarea cererii' 
    });
  }
});

export default router;
