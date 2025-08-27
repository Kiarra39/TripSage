import { generateItinerary } from "../services/itineraryService.js";

export const getItinerary = async (req, res) => {
  try {
    const { destination, days, details } = req.body;

    if (!destination || !days) {
      return res.status(400).json({ error: "Destination and days are required" });
    }

    const itinerary = await generateItinerary(destination, days, details);
    res.json({ itinerary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
