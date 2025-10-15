export function analyzeUserMessage(message) {
  const userMessage = message.toLowerCase();
  const isListRequest = userMessage.includes('listă') || userMessage.includes('afișa') || userMessage.includes('ultimele');
  const isCountRequest = userMessage.includes('câte') || userMessage.includes('număr');
  return { isListRequest, isCountRequest };
}
