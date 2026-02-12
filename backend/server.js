//backend/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import itineraryRoutes from "./routes/itineraryRoutes.js";

dotenv.config();
const app = express();

console.log("Gemini API Key:", process.env.GEMINI_API_KEY);

// Allow frontend (Vite runs on 5173 by default)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());


app.use("/api/itinerary", itineraryRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
