import { useState } from "react";
import { generateItinerary } from "../services/api";

export default function ItineraryForm({ setItinerary, setErr, setLoading, loading, err }) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setItinerary("");
    if (!destination || !days) {
      setErr("Please enter a destination and number of days.");
      return;
    }

    setLoading(true);
    try {
      const data = await generateItinerary({ destination, days, details });
      setItinerary(data.itinerary);
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/40"
    >
      <h2 className="text-xl font-bold text-sky-900 mb-4">Tell us about your trip</h2>

      <label className="text-sm font-medium text-sky-900">Destination</label>
      <input
        type="text"
        placeholder="e.g., Bali"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="mt-1 mb-3 w-full rounded-xl border border-sky-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
        required
      />

      <label className="text-sm font-medium text-sky-900">Days</label>
      <input
        type="number"
        min={1}
        placeholder="e.g., 5"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        className="mt-1 mb-3 w-full rounded-xl border border-sky-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
        required
      />

      <label className="text-sm font-medium text-sky-900">Extra details (optional)</label>
      <textarea
        placeholder="Budget-friendly, love hiking, vegan food, traveling with friends..."
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={5}
        className="mt-1 w-full rounded-xl border border-sky-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
      />

      {err && (
        <p className="mt-3 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          {err}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold py-3 shadow-lg hover:opacity-95 active:scale-[.99] transition disabled:opacity-60"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-5 w-5 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
            Generating…
          </span>
        ) : (
          "🌟 Generate Itinerary"
        )}
      </button>
    </form>
  );
}
