import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTrip, updateTrip } from "../services/api";

const interestOptions = [
  { label: "Adventure", icon: "🏔️" },
  { label: "Culture", icon: "🏛️" },
  { label: "Food", icon: "🍜" },
  { label: "Nature", icon: "🌿" },
  { label: "Shopping", icon: "🛍️" },
  { label: "Nightlife", icon: "🌃" },
  { label: "History", icon: "📜" },
  { label: "Relaxation", icon: "🧘" },
  { label: "Photography", icon: "📷" },
];

const budgetOptions = [
  { value: "budget", label: "Budget", icon: "💰", desc: "Smart saves, big thrills" },
  { value: "moderate", label: "Moderate", icon: "✈️", desc: "Comfort without excess" },
  { value: "luxury", label: "Luxury", icon: "💎", desc: "No compromises" },
];

export default function EditTrip() {
  const { id } = useParams();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(1);
  const [budget, setBudget] = useState("moderate");
  const [interests, setInterests] = useState([]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchTrip(); }, [id]);

  const fetchTrip = async () => {
    try {
      const trip = await getTrip(id);
      setDestination(trip.destination);
      setDuration(trip.duration);
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
    setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await updateTrip(id, { destination, duration, budget, interests, details });
      navigate(`/trip/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-600 text-sm">Loading trip details…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link to={`/trip/${id}`} className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-2">
            ← Back
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs">✈</div>
            <span className="text-white font-semibold text-sm tracking-tight">TripSage</span>
          </div>
          <div className="ml-auto">
            <span className="text-xs text-slate-500 bg-white/4 border border-white/5 px-3 py-1.5 rounded-full">
              Editing: {destination}
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">Edit Trip</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Update your plans</h1>
          <p className="text-slate-500 text-sm mt-2">Adjust the details below — the itinerary will regenerate with your changes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="bg-[#141c2e] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center text-xs text-blue-400 font-bold">1</div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Destination & duration</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-2">Destination <span className="text-blue-400">*</span></label>
                <input
                  type="text"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0f1e] border border-white/6 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-2">Days <span className="text-blue-400">*</span></label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#0a0f1e] border border-white/6 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs pointer-events-none">days</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#141c2e] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center text-xs text-amber-400 font-bold">2</div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Budget style</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {budgetOptions.map(({ value, label, icon, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setBudget(value)}
                  className={`relative p-4 rounded-xl text-left transition-all duration-200 border ${
                    budget === value
                      ? "bg-blue-500/10 border-blue-500/40 ring-1 ring-blue-500/20"
                      : "bg-[#0a0f1e] border-white/5 hover:border-white/12"
                  }`}
                >
                  {budget === value && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">✓</span>
                    </div>
                  )}
                  <div className="text-xl mb-2.5" style={{ fontSize: 20 }}>{icon}</div>
                  <div className="text-sm font-semibold text-white mb-0.5">{label}</div>
                  <div className="text-xs text-slate-500 leading-tight">{desc}</div>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-[#141c2e] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-cyan-500/20 flex items-center justify-center text-xs text-cyan-400 font-bold">3</div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Interests</span>
              </div>
              {interests.length > 0 && (
                <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">{interests.length} selected</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(({ label, icon }) => {
                const active = interests.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleInterest(label)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                      active
                        ? "bg-cyan-500/12 text-cyan-300 border-cyan-500/30"
                        : "bg-[#0a0f1e] text-slate-400 border-white/6 hover:border-white/12 hover:text-white"
                    }`}
                  >
                    <span style={{ fontSize: 14 }}>{icon}</span>
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bg-[#141c2e] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-bold">4</div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Extra details</span>
              <span className="text-xs text-slate-600 ml-auto">(optional)</span>
            </div>
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              rows={4}
              placeholder="Dietary needs, accessibility, must-see spots…"
              className="w-full px-4 py-3 bg-[#0a0f1e] border border-white/6 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition resize-none leading-relaxed"
            />
          </section>

          {error && (
            <div className="bg-red-500/8 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <Link
              to={`/trip/${id}`}
              className="px-6 py-3.5 rounded-xl bg-white/4 text-slate-400 font-medium text-sm hover:bg-white/8 hover:text-white transition border border-white/5"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold text-sm hover:from-emerald-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-900/25"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2.5">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving changes…
                </span>
              ) : "Save changes →"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}