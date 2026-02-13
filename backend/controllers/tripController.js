import Trip from "../models/Trip.js";
import { generateItinerary as generateAIItinerary } from "../services/itineraryService.js";

// @desc    Create new trip
// @route   POST /api/trips
export const createTrip = async (req, res) => {
  try {
    const { destination, duration, details, budget, interests } = req.body;

    if (!destination || !duration) {
      return res.status(400).json({ error: "Destination and days are required" });
    }

    // Build enhanced prompt with budget and interests
    let enhancedDetails = details || "";
    if (budget) {
      enhancedDetails += ` Budget preference: ${budget}.`;
    }
    if (interests && interests.length > 0) {
      enhancedDetails += ` Interests: ${interests.join(", ")}.`;
    }

    // Generate itinerary using AI
    const itineraryData = await generateAIItinerary(destination, duration, enhancedDetails);

    // Save trip to database
    const trip = await Trip.create({
      userId: req.user._id,
      destination,
      duration,
      budget: budget || "moderate",
      interests: interests || [],
      details: details || "",
      itineraryData
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error("Create trip error:", error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all user trips
// @route   GET /api/trips
export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error("Get trips error:", error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Check if trip belongs to user
    if (trip.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(trip);
  } catch (error) {
    console.error("Get trip error:", error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Check authorization
    if (trip.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const { destination, duration, details, budget, interests } = req.body;

    // If core details changed, regenerate itinerary
    if (destination !== trip.destination || duration !== trip.duration) {
      let enhancedDetails = details || trip.details;
      if (budget) enhancedDetails += ` Budget: ${budget}.`;
      if (interests && interests.length > 0) {
        enhancedDetails += ` Interests: ${interests.join(", ")}.`;
      }

      const newItinerary = await generateAIItinerary(
        destination || trip.destination,
        duration || trip.duration,
        enhancedDetails
      );

      trip.itineraryData = newItinerary;
    }

    // Update fields
    trip.destination = destination || trip.destination;
    trip.duration = duration || trip.duration;
    trip.details = details || trip.details;
    trip.budget = budget || trip.budget;
    trip.interests = interests || trip.interests;

    await trip.save();
    res.json(trip);
  } catch (error) {
    console.error("Update trip error:", error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Check authorization
    if (trip.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await trip.deleteOne();
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Delete trip error:", error);
    res.status(500).json({ error: error.message });
  }
};