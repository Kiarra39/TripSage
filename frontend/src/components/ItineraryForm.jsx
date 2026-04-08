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
      className="bg-[#1e293b] border border-white/8 rounded-2xl p-7 shadow-2xl"
    >
      <h2 className="text-lg font-bold text-white mb-6">Tell us about your trip</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Destination <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Bali"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 bg-[#0f172a] border border-white/8 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Number of Days <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min={1}
            placeholder="e.g., 5"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full px-4 py-3 bg-[#0f172a] border border-white/8 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Extra Details <span className="text-slate-600 normal-case">(optional)</span>
          </label>
          <textarea
            placeholder="Budget-friendly, love hiking, vegan food, traveling with friends..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-[#0f172a] border border-white/8 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition resize-none"
          />
        </div>
      </div>

      {err && (
        <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
          {err}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-900/30 hover:from-blue-500 hover:to-cyan-500 active:scale-[.99] transition disabled:opacity-60"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Generating...
          </span>
        ) : " Generate Itinerary"}
      </button>
    </form>
  );
}