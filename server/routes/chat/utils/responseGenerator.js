import {
  handleCreateCall,
  handleUpdateCall,
  handleDeleteCall,
  handleGetCalls,
  handleGetStats
} from './commandHandlers.js';

function removeNewlines(text) {
  if (!text) return text;
  
  return text
    .replace(/\\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
export async function processAction(actionData, cleanMessage) {
  if (!actionData?.action) {
    return cleanMessage || 'Не удалось определить действие.';
  }

  console.log('Processing action:', actionData.action);

  let actionResponse = '';

  switch (actionData.action) {
    case 'createCall':
      actionResponse = await handleCreateCall(actionData);
      break;

    case 'updateCall':
      actionResponse = await handleUpdateCall(actionData);
      break;

    case 'deleteCall':
      actionResponse = await handleDeleteCall(actionData);
      break;

    case 'getCalls':
      actionResponse = await handleGetCalls(actionData);
      break;

    case 'getStats':
      actionResponse = await handleGetStats();
      break;

    default:
      console.log('Unknown action:', actionData.action);
      actionResponse = 'Acțiune necunoscută.';
  }

  if (actionData.action === 'getCalls' || actionData.action === 'getStats') {
    return removeNewlines(actionResponse);
  }
  
  let finalResponse;
  if (cleanMessage && cleanMessage.length > 0) {
    finalResponse = `${cleanMessage} ${actionResponse}`;
  } else {
    finalResponse = actionResponse;
  }
  
  return removeNewlines(finalResponse);
}

export function generateErrorResponse(error) {
  console.error('Chat error:', error);
  return 'A apărut o eroare în procesarea cererii. Vă rugăm să încercați din nou.';
}
