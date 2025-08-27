import express from "express";
import { getItinerary } from "../controllers/itineraryController.js";

const router = express.Router();

router.post("/generate", getItinerary);

export default router;
