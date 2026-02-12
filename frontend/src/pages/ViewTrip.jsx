import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTrip } from "../services/api";
import ItineraryResponse from "../components/ItineraryResponse";

export default function ViewTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const data = await getTrip(id);
      setTrip(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200">
        <div className="h-12 w-12 rounded-full border-4 border-sky-900/30 border-t-sky-900 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 max-w-md">
          <p className="text-rose-600 mb-4">{error}</p>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-2 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-300/50 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col">
        <header className="px-6 pt-6 flex justify-between items-center">
          <Link to="/dashboard">
            <h1 className="text-3xl md:text-5xl font-extrabold text-sky-900 drop-shadow">
              ✈️ TripSage
            </h1>
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2 rounded-xl bg-white/80 backdrop-blur text-sky-900 font-semibold hover:bg-white transition"
          >
            ← Back
          </Link>
        </header>

        <main className="flex-1 overflow-hidden">
          <ItineraryResponse itinerary={trip.itineraryData} />
        </main>
      </div>
    </div>
  );
}