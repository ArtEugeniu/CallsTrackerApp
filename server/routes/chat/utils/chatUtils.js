import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function sendToOpenAI(userMessage, systemPrompt) {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0]?.message?.content || 'Nu am primit un răspuns valid de la OpenAI.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

export function generateFallbackResponse() {
  const fallbackResponses = [
    'Îmi pare rău, nu am înțeles ce vrei să faci. Poți să repeți?',
    'Nu am putut procesa cererea ta. Te rog să încerci din nou.',
    'Scuze, ceva nu a mers bine. Poți să reformulezi?',
    'Nu am reușit să înțeleg. Poți să îmi dai mai multe detalii?'
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}
