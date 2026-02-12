import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: "v1",
});

const buildDynamicPrompt = (destination, days, details = "") => {
  return `
Return ONLY valid JSON in this exact structure:

{
  "destination": "${destination}",
  "duration": ${days},
  "totalEstimatedCost": "string",
  "itinerary": [
    {
      "day": 1,
      "activities": {
        "morning": "string",
        "afternoon": "string",
        "evening": "string"
      },
      "estimatedCost": "string",
      "accommodation": "string"
    }
  ],
  "transportationTips": "string",
  "additionalRecommendations": "string"
}

Create a detailed ${days}-day itinerary for ${destination}.

${details ? `User preferences: ${details}` : ""}
`;
};


export const generateItinerary = async (destination, days, details = "") => {
  try {
    const prompt = buildDynamicPrompt(destination, days, details);

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
    });

    const rawText = response.text;

    // Remove markdown fences
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON object safely
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return parsed;

  } catch (error) {
    console.error("❌ Error generating itinerary:", error);

    // 🔥 Return SAFE fallback structure matching frontend expectation
    return {
      destination,
      duration: days,
      totalEstimatedCost: "Not available",
      itinerary: [],
      transportationTips: "Unable to generate transportation tips.",
      additionalRecommendations: "Please try again."
    };
  }
};
