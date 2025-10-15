# Call Tracker - ChatGPT Integration

## Presentation
Web app for call tracking with ChatGPT integration. Manage calls via React UI or natural language commands.

## Technologies
**Backend**: Node.js + Express + SQLite + OpenAI API  
**Frontend**: React 19 + TypeScript + Vite + SASS

## Setup Local
### Prerequisites: Node.js 18+, npm, OpenAI API key

### Installation
```bash
git clone <repo> && cd test-project-bravin
cd server && npm install && echo "OPENAI_API_KEY=your_key" > .env
cd ../client && npm install
# Run: server: npm run dev, client: npm run dev
```
**Access**: Frontend http://localhost:5173, API http://localhost:5000

## ChatGPT Integration
Endpoint `POST /api/chat` processes Romanian/English commands:
```bash
"Add call +40723456789, Ion Popescu, 5min, completed, qualified"
"Show calls from last week" / "Arată apelurile"  
"How many calls today?" / "Câte apeluri azi?"
"Update call ID 123, outcome not_interested"
```

## API Documentation
**Endpoints**: GET/POST/PUT/DELETE `/api/calls`, GET `/api/calls/stats`, POST `/api/chat`  
Full docs: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## Demo
Video demo: web app + ChatGPT integration + technical explanation

## Architecture
```
Express.js → SQLite → OpenAI API
React/TS → REST API → Backend  
Message → GPT → Action → Response
```
Modular chat: messageParser, commandHandlers, chatUtils, responseGenerator

## Bonus Features
✅ Analytics Dashboard ✅ Multi-language ✅ AI parsing ✅ Docker setup

## Known Issues
Single-user, text-only, SQLite only. Future: auth, real-time, mobile, CRM.

---
**AI-powered call management** 🚀