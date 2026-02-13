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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
        <div className="bg-white rounded-xl p-8 max-w-md border border-red-200">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard">
            <h1 className="text-2xl font-bold text-blue-900">TripSage</h1>
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ItineraryResponse itinerary={trip.itineraryData} />
      </main>
    </div>
  );
}