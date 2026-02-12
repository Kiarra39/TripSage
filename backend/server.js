import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/itinerary", itineraryRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "TripSage API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));