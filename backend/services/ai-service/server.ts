import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { query } from '../../database/client.js';

const app = express();
const PORT = process.env.AI_SERVICE_PORT || 5005;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'ai-service',
    tier: 'Tier 2 (Microservices Architecture)',
    endpoints: ['POST /ai/chat', '/health']
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-service',
    timestamp: new Date().toISOString()
  });
});

// Fallback rule-based scheme assistant when Gemini API key is not configured
async function generateKnowledgeResponse(message: string): Promise<string> {
  const lower = message.toLowerCase();
  
  if (lower.includes('pmjay') || lower.includes('ayushman')) {
    const res = await query("SELECT * FROM schemes WHERE code = 'PMJAY'");
    if (res.rows.length > 0) {
      const s = res.rows[0];
      return `**${s.name} (${s.code})**:\n- **Coverage:** Up to ₹${(s.coverage_limit / 100000).toFixed(0)} Lakhs per family per year.\n- **Eligibility:** ${s.eligibility}\n- **Helpline:** ${s.helpline_number}\n- **Cashless:** Yes, at all empanelled public and private hospitals across India.`;
    }
  }

  if (lower.includes('aarogyasri')) {
    const res = await query("SELECT * FROM schemes WHERE code = 'AAROGYASRI'");
    if (res.rows.length > 0) {
      const s = res.rows[0];
      return `**${s.name}**:\n- **Coverage:** ₹5 Lakhs per family per year in Telangana and Andhra Pradesh.\n- **Eligibility:** ${s.eligibility}\n- **Helpline:** ${s.helpline_number}`;
    }
  }

  if (lower.includes('hospital') || lower.includes('bed') || lower.includes('icu')) {
    const res = await query(`
      SELECT h.name, h.city, bs.available_icu, bs.available_general 
      FROM hospitals h 
      JOIN bed_statuses bs ON h.id = bs.hospital_id 
      WHERE bs.available_icu > 0 
      LIMIT 3
    `);
    const list = res.rows.map(r => `• **${r.name}** (${r.city}) - Vacant ICU Beds: ${r.available_icu}, General: ${r.available_general}`).join('\n');
    return `Here are some hospitals with live bed vacancies right now:\n${list}\n\nSearch more on our Hospital Locator tab!`;
  }

  return `Hello! I am 'Arogya', your healthcare scheme assistant. You can ask me about schemes like PMJAY, Aarogyasri, CGHS, live ICU bed availability in empanelled hospitals, or surgical package estimates!`;
}

// POST /ai/chat
app.post('/ai/chat', async (req, res) => {
  const { history, message, apiKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API Key is required to use the chatbot.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-1.5-flash';
    const contents = [...(history || []), { role: 'user', parts: [{ text: message }] }];
    
    // @ts-ignore
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: `You are 'Arogya', an expert AI advisor for Health Scheme Connect. Help patients understand Indian government health schemes (PMJAY, CGHS, ESI, state schemes), cashless treatment rules, and hospital eligibility. Never provide medical advice.`,
      },
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error('[AI Service] Gemini error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI. Please check your API Key.' });
  }
});

export function startAiService(port = PORT) {
  return app.listen(port, () => {
    console.log(`🤖 AI Assistant Microservice running on port ${port}`);
  });
}

if (process.argv[1] && process.argv[1].endsWith('ai-service/server.ts')) {
  startAiService();
}

export default app;
