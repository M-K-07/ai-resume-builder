import { GoogleGenAI } from "@google/genai";

function getApiKeys() {
  const keys = [];

  // 1. Check primary key variable (supports comma-separated string)
  if (process.env.NEXT_PUBLIC_GEMINI_AI_API) {
    const rawKeys = process.env.NEXT_PUBLIC_GEMINI_AI_API.split(",");
    rawKeys.forEach((k) => {
      const trimmed = k.trim();
      if (trimmed && !keys.includes(trimmed)) keys.push(trimmed);
    });
  }

  // 2. Check numbered env variables: NEXT_PUBLIC_GEMINI_AI_API_1, _2, _3...
  let i = 1;
  while (process.env[`NEXT_PUBLIC_GEMINI_AI_API_${i}`]) {
    const key = process.env[`NEXT_PUBLIC_GEMINI_AI_API_${i}`].trim();
    if (key && !keys.includes(key)) keys.push(key);
    i++;
  }

  return keys;
}

let currentKeyIndex = 0;

export async function GenAi(prompt) {
  const keys = getApiKeys();

  if (keys.length === 0) {
    throw new Error("No Gemini API key found in environment variables.");
  }

  let lastError = null;
  const totalKeys = keys.length;

  for (let attempt = 0; attempt < totalKeys; attempt++) {
    const keyIdx = (currentKeyIndex + attempt) % totalKeys;
    const apiKey = keys[keyIdx];

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      // Save working key index for subsequent calls
      currentKeyIndex = keyIdx;
      return response.text;
    } catch (error) {
      console.warn(
        `[Gemini AI] Key #${keyIdx + 1} failed or exhausted (${error?.message || "Rate limit reached"}). Falling back to next key...`
      );
      lastError = error;
    }
  }

  throw lastError || new Error("All Gemini API keys failed or exhausted their quota.");
}

