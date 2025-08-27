// backend/utils/generateItinerary.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); 


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates an itinerary using Gemini API
 * @param {string} destination - Travel destination
 * @param {number} days - Number of days for the trip
 * @param {string} [details] - Extra details provided by the user
 * @returns {string} - Itinerary text
 */
export const generateItinerary = async (destination, days, details = "") => {
  try {
const buildDynamicPrompt = (destination, days, details = "") => {
  let prompt = `You are TripSage, an AI travel assistant. Create a detailed ${days}-day itinerary for ${destination}.`;
  
  // Add sections based on what information we have
  prompt += `\n\nThe itinerary should include:`;
  prompt += `\n1. Daily schedule with morning, afternoon, and evening activities`;
  prompt += `\n2. Key attractions to visit`;
  prompt += `\n3. Food and dining suggestions`;
  
  // Conditionally add budget section if mentioned in details
  if (details.toLowerCase().includes('budget') || details.toLowerCase().includes('cost')) {
    prompt += `\n4. Estimated costs for each day`;
  }
  
  // Conditionally add transportation section if mentioned
  if (details.toLowerCase().includes('transport') || details.toLowerCase().includes('travel')) {
    prompt += `\n5. Transportation options between locations`;
  }
  
  prompt += `\n6. Additional tips or recommendations`;
  
  // Add user preferences if provided
  if (details && details.trim() !== "") {
    prompt += `\n\nUser preferences: ${details}`;
  } else {
    prompt += `\n\nNo specific preferences provided - create a balanced itinerary with popular activities.`;
  }
  
  prompt += `\n\nProvide a comprehensive, well-structured itinerary that helps travelers make the most of their trip.`;
  
  return prompt;
};

// Then use it in your function:
const prompt = buildDynamicPrompt(destination, days, details);


    const result = await model.generateContent(prompt);


    return result.response.text();
  } catch (error) {
    console.error("❌ Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary");
  }
};
