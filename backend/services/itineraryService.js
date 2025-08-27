// backend/utils/generateItinerary.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // makes sure process.env is available

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Pick your model (gemini-1.5-flash is lightweight & fast)
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
   const prompt = `
  You are TripSage, an AI travel assistant. Create a detailed ${days}-day itinerary for ${destination}.
  The itinerary should include:
  1. Daily schedule with morning, afternoon, and evening activities
  2. Key attractions to visit
  3. Food and dining suggestions
  4. Estimated costs for each day
  5. Transportation options
  6. Additional tips or recommendations
  
  User preferences: ${details || "No specific preferences provided"}.
  
  Provide a comprehensive, well-structured itinerary that helps travelers make the most of their trip.
`;

    // ✅ Call Gemini
    const result = await model.generateContent(prompt);

    // ✅ Always return clean text
    return result.response.text();
  } catch (error) {
    console.error("❌ Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary");
  }
};
