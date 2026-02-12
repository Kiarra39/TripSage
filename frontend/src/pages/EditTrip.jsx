import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTrip, updateTrip } from "../services/api";

export default function EditTrip() {
  const { id } = useParams();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("moderate");
  const [interests, setInterests] = useState([]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const interestOptions = [
    "Adventure", "Culture", "Food", "Nature", "Shopping",
    "Nightlife", "History", "Relaxation", "Photography"
  ];

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const trip = await getTrip(id);
      setDestination(trip.destination);
      setDays(trip.duration.toString());
      setBudget(trip.budget);
      setInterests(trip.interests || []);
      setDetails(trip.details || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    setSubmitting(true);

    try {
      await updateTrip(id, {
        destination,
        days: parseInt(days),
        budget,
        interests,
        details
      });

      navigate(`/trip/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200">
        <div className="h-12 w-12 rounded-full border-4 border-sky-900/30 border-t-sky-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      {/* Same background as CreateTrip */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-300/50 blur-3xl" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-6 pt-6">
          <Link to="/dashboard">
            <h1 className="text-3xl md:text-5xl font-extrabold text-sky-900 drop-shadow">
              ✈️ TripSage
            </h1>
          </Link>
          <p className="text-sky-800/80 mt-1">Edit your trip</p>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40"
            >
              <h2 className="text-2xl font-bold text-sky-900 mb-6">Update Trip Details</h2>

              {/* Same form fields as CreateTrip */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sky-900 mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-sky-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-sky-900 mb-1">
                  Number of Days *
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full rounded-xl border border-sky-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
                  required
                />
              </div>

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

              <div className="mb-4">
                <label className="block text-sm font-medium text-sky-900 mb-2">
                  Interests
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

              <div className="mb-6">
                <label className="block text-sm font-medium text-sky-900 mb-1">
                  Additional Details (optional)
                </label>
                <textarea
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
                  to={`/trip/${id}`}
                  className="flex-1 text-center px-6 py-3 rounded-xl bg-white/60 text-sky-900 font-semibold hover:bg-white transition"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-95 transition disabled:opacity-60"
                >
                  {submitting ? "Updating..." : "💾 Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}