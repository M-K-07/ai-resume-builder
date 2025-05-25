import { GoogleGenAI } from "@google/genai";

const APIKEY = process.env.NEXT_PUBLIC_GEMINI_AI_API;
const ai = new GoogleGenAI({ apiKey: APIKEY });

export async function GenAi(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return (response.text);
}
