import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTrip } from "../services/api";

export default function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
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

    if (!destination || !days) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const trip = await createTrip({
        destination,
        days: parseInt(days),
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
    <div className="min-h-screen w-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-300/50 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-6 pt-6">
          <Link to="/dashboard">
            <h1 className="text-3xl md:text-5xl font-extrabold text-sky-900 drop-shadow">
              ✈️ TripSage
            </h1>
          </Link>
          <p className="text-sky-800/80 mt-1">Create a new adventure</p>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40"
            >
              <h2 className="text-2xl font-bold text-sky-900 mb-6">Plan Your Trip</h2>

              {/* Destination */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sky-900 mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Paris, Tokyo, Bali"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-sky-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
                  required
                />
              </div>

              {/* Days */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sky-900 mb-1">
                  Number of Days *
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  placeholder="e.g., 5"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full rounded-xl border border-sky-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
                  required
                />
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sky-900 mb-2">
                  Budget Preference
                </label>
                <div className="flex gap-3">
                  {["budget", "moderate", "luxury"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`flex-1 px-4 py-2 rounded-xl font-semibold transition ${
                        budget === b
                          ? "bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white"
                          : "bg-white/60 text-sky-900 hover:bg-white"
                      }`}
                    >
                      {b.charAt(0).toUpperCase() + b.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sky-900 mb-2">
                  Interests (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-xl font-medium transition ${
                        interests.includes(interest)
                          ? "bg-sky-500 text-white"
                          : "bg-white/60 text-sky-900 hover:bg-white"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-sky-900 mb-1">
                  Additional Details (optional)
                </label>
                <textarea
                  placeholder="Any specific requests, dietary restrictions, accessibility needs, etc."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-sky-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
                />
              </div>

              {error && (
                <p className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <Link
                  to="/dashboard"
                  className="flex-1 text-center px-6 py-3 rounded-xl bg-white/60 text-sky-900 font-semibold hover:bg-white transition"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-95 transition disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    "🌟 Generate Itinerary"
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}