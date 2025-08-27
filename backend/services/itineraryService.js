import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//  Generation configuration
const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 2048,
};

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig
});

//  Token counting function
const countTokens = (text) => {
  return Math.ceil(text.length / 4);
};

//  Structured output prompt building
const buildDynamicPrompt = (destination, days, details = "") => {
  let prompt = `You are TripSage, an AI travel assistant. Create a detailed ${days}-day itinerary for ${destination}.`;
  
  prompt += `\n\nProvide your response as a VALID JSON object with the following structure:`;
  prompt += `\n{
  "destination": "${destination}",
  "duration": ${days},
  "totalEstimatedCost": "estimated total cost range",
  "itinerary": [
    {
      "day": 1,
      "date": "optional specific date if provided",
      "activities": {
        "morning": "activity description with time and location",
        "afternoon": "activity description with time and location",
        "evening": "activity description with time and location"
      },
      "estimatedCost": "day's estimated cost range",
      "accommodation": "suggested accommodation option"
    }
  ],
  "transportationTips": "general transportation advice",
  "additionalRecommendations": "other tips or suggestions"
}`;

  if (details && details.trim() !== "") {
    prompt += `\n\nUser preferences: ${details}`;
  } else {
    prompt += `\n\nNo specific preferences provided - create a balanced itinerary with popular activities.`;
  }
  
  prompt += `\n\nEnsure your response is valid JSON that can be parsed by JSON.parse().`;
  
  return prompt;
};

export const generateItinerary = async (destination, days, details = "") => {
  try {
    const prompt = buildDynamicPrompt(destination, days, details);
    
    const promptTokens = countTokens(prompt);
    console.log(`Prompt tokens: ${promptTokens}`);
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    //  Parse JSON response
    let parsedResponse;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = { itinerary: responseText };
      }
    } catch (parseError) {
      console.error("JSON parse error, using fallback:", parseError);
      parsedResponse = { itinerary: responseText };
    }
    
    const responseTokens = countTokens(responseText);
    console.log(`Response tokens: ${responseTokens}`);
    console.log(`Total tokens: ${promptTokens + responseTokens}`);
    
    return parsedResponse;
  } catch (error) {
    console.error("❌ Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary");
  }
};