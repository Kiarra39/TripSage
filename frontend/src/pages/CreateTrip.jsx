import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTrip } from "../services/api";

export default function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(1);
  const [budget, setBudget] = useState("moderate");
  const [interests, setInterests] = useState([]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const interestOptions = [
    "Adventure", "Culture", "Food", "Nature", "Shopping",
    "Nightlife", "History", "Relaxation", "Photography"
  ];

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!destination || !duration) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const trip = await createTrip({
        destination,
     duration,
        budget,
        interests,
        details
      });

      navigate(`/trip/${trip._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/dashboard">
            <h1 className="text-2xl font-bold text-blue-900">TripSage</h1>
            <p className="text-sm text-blue-600">Create new trip</p>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Plan Your Trip</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Paris, Tokyo, Bali"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Days */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Number of Days <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="30"
                placeholder="e.g., 5"
                  value={duration}
         onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-3">
                Budget Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["budget", "moderate", "luxury"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`px-4 py-3 rounded-lg font-medium transition ${
                      budget === b
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                    }`}
                  >
                    {b.charAt(0).toUpperCase() + b.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-3">
                Interests (select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      interests.includes(interest)
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Additional Details (optional)
              </label>
              <textarea
                placeholder="Any specific requests, dietary restrictions, accessibility needs, etc."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Link
                to="/dashboard"
                className="flex-1 text-center px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Generating...
                  </span>
                ) : (
                  "Generate Itinerary"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}