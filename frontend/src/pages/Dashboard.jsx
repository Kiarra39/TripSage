import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserTrips, deleteTrip } from "../services/api";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getUserTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      await deleteTrip(id);
      setTrips(trips.filter(trip => trip._id !== id));
    } catch (err) {
      alert("Failed to delete trip: " + err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-300/50 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-6 pt-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-sky-900 drop-shadow">
              ✈️ TripSage
            </h1>
            <p className="text-sky-800/80 mt-1">Welcome back, {user?.name}!</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/create-trip"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold hover:opacity-95 transition"
            >
              + New Trip
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-white/80 backdrop-blur text-sky-900 font-semibold hover:bg-white transition"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-sky-900 mb-6">My Trips</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 rounded-full border-4 border-sky-900/30 border-t-sky-900 animate-spin" />
              </div>
            ) : error ? (
              <p className="text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-4 py-3">
                {error}
              </p>
            ) : trips.length === 0 ? (
              <div className="text-center py-12 bg-white/80 backdrop-blur rounded-2xl">
                <p className="text-sky-800/80 mb-4">You haven't created any trips yet.</p>
                <Link
                  to="/create-trip"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold hover:opacity-95 transition"
                >
                  Create Your First Trip
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <div
                    key={trip._id}
                    className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold text-sky-900 mb-2">
                      {trip.destination}
                    </h3>
                    <p className="text-sky-800/80 mb-1">
                      <strong>Duration:</strong> {trip.duration} days
                    </p>
                    <p className="text-sky-800/80 mb-1">
                      <strong>Budget:</strong> {trip.budget}
                    </p>
                    {trip.interests.length > 0 && (
                      <p className="text-sky-800/80 mb-4">
                        <strong>Interests:</strong> {trip.interests.join(", ")}
                      </p>
                    )}
                    <p className="text-sm text-sky-700/60 mb-4">
                      Created {new Date(trip.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2">
                      <Link
                        to={`/trip/${trip._id}`}
                        className="flex-1 text-center px-4 py-2 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-trip/${trip._id}`}
                        className="flex-1 text-center px-4 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(trip._id)}
                        className="px-4 py-2 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <footer className="px-6 pb-6 text-sky-900/80 text-sm text-center">
          Travel smarter, discover further.
        </footer>
      </div>
    </div>
  );
}