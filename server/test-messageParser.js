import { parseActionFromMessage, applyAliases, analyzeUserMessage } from './routes/chat/utils/messageParser.js';

console.log('parseActionFromMessage:', typeof parseActionFromMessage);
console.log('applyAliases:', typeof applyAliases);
console.log('analyzeUserMessage:', typeof analyzeUserMessage);

if (parseActionFromMessage && applyAliases && analyzeUserMessage) {
  console.log('SUCCESS: All functions exported correctly');
} else {
  console.log('ERROR: Functions not exported');
}
