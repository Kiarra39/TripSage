import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserTrips, deleteTrip } from "../services/api";

const budgetStyles = {
  budget: { pill: "bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/25", dot: "bg-amber-400" },
  moderate: { pill: "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/25", dot: "bg-emerald-400" },
  luxury: { pill: "bg-violet-400/10 text-violet-300 ring-1 ring-violet-400/25", dot: "bg-violet-400" },
};

const interestColors = [
  "text-sky-300 bg-sky-400/8 ring-1 ring-sky-400/20",
  "text-rose-300 bg-rose-400/8 ring-1 ring-rose-400/20",
  "text-lime-300 bg-lime-400/8 ring-1 ring-lime-400/20",
  "text-fuchsia-300 bg-fuchsia-400/8 ring-1 ring-fuchsia-400/20",
  "text-orange-300 bg-orange-400/8 ring-1 ring-orange-400/20",
  "text-cyan-300 bg-cyan-400/8 ring-1 ring-cyan-400/20",
];

function TripCard({ trip, onDelete }) {
  const style = budgetStyles[trip.budget] || budgetStyles.moderate;

  return (
    <div className="group relative bg-[#141c2e] rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-white/12 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/40 flex flex-col">

      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/60 via-cyan-400/40 to-transparent" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-white tracking-tight truncate">
              {trip.destination}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {trip.duration} {trip.duration === 1 ? "day" : "days"}
            </p>
          </div>

          <span className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${style.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {trip.budget}
          </span>
        </div>

        {/* Interests */}
        {trip.interests?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {trip.interests.slice(0, 4).map((interest, i) => (
              <span key={interest} className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${interestColors[i % interestColors.length]}`}>
                {interest}
              </span>
            ))}
            {trip.interests.length > 4 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md text-slate-500 bg-white/5">
                +{trip.interests.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-white/5 mt-2">
          <Link
            to={`/trip/${trip._id}`}
            className="flex-1 text-center text-[11px] font-semibold py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            View Itinerary
          </Link>

          <Link
            to={`/edit-trip/${trip._id}`}
            className="px-3 py-2 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white bg-white/4 hover:bg-white/8 border border-white/5 transition-colors"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(trip)}
            className="px-3 py-2 rounded-lg text-[11px] font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/8 border border-white/5 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchTrips(); }, []);

  const fetchTrips = async () => {
    const data = await getUserTrips();
    setTrips(data);
    setLoading(false);
  };

  const stats = useMemo(() => ({
    total: trips.length,
    totalDays: trips.reduce((sum, t) => sum + (t.duration || 0), 0),
    destinations: new Set(trips.map(t => t.destination)).size,
    topInterest: (() => {
      const freq = {};
      trips.forEach(t => (t.interests || []).forEach(i => { freq[i] = (freq[i] || 0) + 1; }));
      return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    })()
  }), [trips]);

  const filtered = useMemo(() => trips.filter(t => {
    const matchSearch = t.destination.toLowerCase().includes(search.toLowerCase());
    const matchBudget = budgetFilter === "all" || t.budget === budgetFilter;
    return matchSearch && matchBudget;
  }), [trips, search, budgetFilter]);

  const confirmDelete = (trip) => { setTripToDelete(trip); setShowDeleteModal(true); };

  const handleDelete = async () => {
    await deleteTrip(tripToDelete._id);
    await fetchTrips();
    setShowDeleteModal(false);
    setTripToDelete(null);
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e]">

      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-semibold">TripSage</span>

          <div className="flex gap-3">
            <Link to="/create-trip" className="px-4 py-2 bg-blue-600 text-white rounded-xl">
              New Trip
            </Link>

            <button onClick={() => { logout(); navigate("/"); }}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-white mb-6">
          {greeting()}, {user?.name?.split(" ")[0]}
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Trips planned", value: stats.total },
            { label: "Total days", value: stats.totalDays },
            { label: "Destinations", value: stats.destinations },
            { label: "Favourite vibe", value: stats.topInterest },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#141c2e] border border-white/5 rounded-2xl p-5">
              <p className="text-2xl font-bold text-white mb-1">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 bg-[#141c2e] rounded-xl text-white"
        />

        {/* Trips */}
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(trip => (
              <TripCard key={trip._id} trip={trip} onDelete={confirmDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}