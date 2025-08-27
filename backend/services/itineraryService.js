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
      Generate a ${days}-day travel itinerary for ${destination}.
      Include day-wise plans with attractions, activities, and food suggestions.
      Additional trip details: ${details || "No extra details provided"}.
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
