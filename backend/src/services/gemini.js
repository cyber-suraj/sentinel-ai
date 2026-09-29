const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeText(text) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.5-flash-lite',
    generationConfig: {
      responseMimeType: 'application/json',
    }
  });

  const prompt = "You are a content security analyzer. Identify every span that (a) contains PII, credentials, or financial data, or (b) shows social-engineering signals such as urgency, impersonation, or suspicious requests. Return strict JSON: { score: integer 0-100, flags: [{ span: string (exact substring from input), category: string (pii|credential|financial|urgency|impersonation|suspicious-link|other), reason: string (one short plain-language sentence) }] }. Every span must appear verbatim in the input. Do not invent spans. Do not include any text outside the JSON.";

  const result = await model.generateContent([prompt, text]);
  const response = await result.response;
  return JSON.parse(response.text());
}

module.exports = {
  analyzeText
};
