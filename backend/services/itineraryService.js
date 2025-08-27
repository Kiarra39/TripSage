import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//  Token counting function
const countTokens = (text) => {
  return Math.ceil(text.length / 4);
};

//  Dynamic prompt building
const buildDynamicPrompt = (destination, days, details = "") => {
  let prompt = `You are TripSage, an AI travel assistant. Create a detailed ${days}-day itinerary for ${destination}.`;
  
  prompt += `\n\nThe itinerary should include:`;
  prompt += `\n1. Daily schedule with morning, afternoon, and evening activities`;
  prompt += `\n2. Key attractions to visit`;
  prompt += `\n3. Food and dining suggestions`;
  
  if (details.toLowerCase().includes('budget') || details.toLowerCase().includes('cost')) {
    prompt += `\n4. Estimated costs for each day`;
  }
  
  if (details.toLowerCase().includes('transport') || details.toLowerCase().includes('travel')) {
    prompt += `\n5. Transportation options between locations`;
  }
  
  prompt += `\n6. Additional tips or recommendations`;
  
  if (details && details.trim() !== "") {
    prompt += `\n\nUser preferences: ${details}`;
  } else {
    prompt += `\n\nNo specific preferences provided - create a balanced itinerary with popular activities.`;
  }
  
  prompt += `\n\nProvide a comprehensive, well-structured itinerary that helps travelers make the most of their trip.`;
  
  return prompt;
};

export const generateItinerary = async (destination, days, details = "") => {
  try {
    const prompt = buildDynamicPrompt(destination, days, details);
    
    //  Count and log prompt tokens
    const promptTokens = countTokens(prompt);
    console.log(`Prompt tokens: ${promptTokens}`);
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Count and log response tokens
    const responseTokens = countTokens(responseText);
    console.log(`Response tokens: ${responseTokens}`);
    console.log(`Total tokens: ${promptTokens + responseTokens}`);
    
    return responseText;
  } catch (error) {
    console.error("❌ Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary");
  }
};