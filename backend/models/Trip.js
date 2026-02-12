import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  budget: {
    type: String,
    enum: ["budget", "moderate", "luxury"],
    default: "moderate"
  },
  interests: {
    type: [String],
    default: []
  },
  details: {
    type: String,
    default: ""
  },
  itineraryData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

tripSchema.pre("save", async function ()  {
  this.updatedAt = Date.now();
  
});

export default mongoose.model("Trip", tripSchema);