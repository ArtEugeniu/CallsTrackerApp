export function parseActionFromMessage(gptMessage) {
  let actionData = null;
  let cleanMessage = gptMessage;
  
  try {
    const jsonRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    const matches = gptMessage.match(jsonRegex);
    
    if (matches && matches.length > 0) {
      let jsonString = matches[matches.length - 1];
      jsonString = jsonString.replace(/\}[^}]*$/, '}');
      console.log("Matched JSON:", jsonString);
      
      actionData = JSON.parse(jsonString);
      console.log("Parsed actionData:", actionData);
      
      cleanMessage = gptMessage.replace(jsonRegex, '').trim();
      cleanMessage = cleanMessage.replace(/\s*\.?\s*$/, '').trim();
    }
  } catch (err) {
    console.error("JSON parse error:", err);
    console.error("Failed to parse:", matches ? matches[matches.length - 1] : 'No matches found');
  }
  
  return { actionData, cleanMessage };
}

export function applyAliases(actionData) {
  const aliases = {
    name: 'contact_name',
    date: 'call_date', 
    duration: 'duration_seconds',
    phone: 'phone_number',
    status: 'status',
    outcome: 'outcome',
    notes: 'notes'
  };
  
  if (actionData?.data) {
    Object.entries(aliases).forEach(([alias, dbKey]) => {
      if (actionData.data[alias] !== undefined && actionData.data[dbKey] === undefined) {
        actionData.data[dbKey] = actionData.data[alias];
        delete actionData.data[alias];
      }
    });
  }
  
  return actionData;
}

export function analyzeUserMessage(message) {
  const userMessage = message.toLowerCase();
  const isListRequest = userMessage.includes('listă') || userMessage.includes('afișa') || userMessage.includes('ultimele');
  const isCountRequest = userMessage.includes('câte') || userMessage.includes('număr');
  return { isListRequest, isCountRequest };
}
