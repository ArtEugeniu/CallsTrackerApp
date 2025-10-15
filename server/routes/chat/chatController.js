import dotenv from 'dotenv';
import { parseActionFromMessage, applyAliases, analyzeUserMessage } from './utils/messageParser.js';
import { sendToOpenAI, generateFallbackResponse } from './utils/chatUtils.js';
import { processAction, generateErrorResponse } from './utils/responseGenerator.js';
import { handleGetCalls, handleGetStats } from './utils/commandHandlers.js';

dotenv.config();

function removeAllNewlines(text) {
  if (!text) return text;
  
  return text
    .replace(/\\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function processChatMessage(message) {
  try {
    console.log('Processing user message:', message);

    const { isListRequest, isCountRequest, isUpdateRequest, isCreateRequest, isDeleteRequest } = analyzeUserMessage(message);
    
    if (isListRequest || isCountRequest) {
      console.log('Direct request detected, bypassing GPT');
      
      if (isListRequest) {
        const response = await handleGetCalls();
        return removeAllNewlines(response);
      }
      
      if (isCountRequest) {
        const response = await handleGetStats();
        return removeAllNewlines(response);
      }
    }

    let gptResponse;
    try {
      const systemPrompt = `Ești un asistent pentru managementul apelurilor. Răspunde în română și generează JSON pentru acțiuni. 

Pentru UPDATE/MODIFICARE apeluri, folosește acest format:
{"action": "updateCall", "data": {"id": ID_NUMĂR, "field_to_update": "new_value"}}

Pentru CREATE apeluri:
{"action": "createCall", "data": {"contact_name": "nume", "phone_number": "telefon", "call_date": "YYYY-MM-DD", "duration_seconds": număr, "status": "completed/missed/answered", "outcome": "successful/not_interested/callback", "notes": "observații"}}

Pentru DELETE apeluri:
{"action": "deleteCall", "data": {"id": ID_NUMĂR}}

Pentru AFIȘARE/LISTARE apeluri:
{"action": "getCalls", "data": {}}

Pentru STATISTICI:
{"action": "getStats", "data": {}}

Exemple:
- "Update apelul ID 150 outcome not_interested" → {"action": "updateCall", "data": {"id": 150, "outcome": "not_interested"}}
- "Schimbă apelul cu id 150 ca outcome să fie not_interested" → {"action": "updateCall", "data": {"id": 150, "outcome": "not_interested"}}

Răspunde cu JSON + mesaj explicativ.`;
      
      gptResponse = await sendToOpenAI(message, systemPrompt);
      console.log('GPT Response:', gptResponse);
    } catch (openaiError) {
      console.error('OpenAI error, using fallback:', openaiError);
      const fallback = generateFallbackResponse(message);
      if (fallback.actionData) {
        return await processAction(fallback.actionData, fallback.response);
      }
      return fallback.response;
    }

    const { actionData, cleanMessage } = parseActionFromMessage(gptResponse);
    const processedActionData = actionData ? applyAliases(actionData) : null;

    if (processedActionData) {
      return await processAction(processedActionData, cleanMessage);
    }

    const finalMessage = cleanMessage || 'Не удалось обработать запрос.';
    return removeAllNewlines(finalMessage);

  } catch (error) {
    return generateErrorResponse(error);
  }
}
