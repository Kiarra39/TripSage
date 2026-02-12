import express from "express";
import {
  createTrip,
  getUserTrips,
  getTrip,
  updateTrip,
  deleteTrip
} from "../controllers/tripController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/")
  .get(getUserTrips)
  .post(createTrip);

router.route("/:id")
  .get(getTrip)
  .put(updateTrip)
  .delete(deleteTrip);

export default router;