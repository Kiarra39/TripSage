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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">TripSage</h1>
            <p className="text-sm text-blue-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/create-trip"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              New Trip
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">My Trips</h2>
          <p className="text-blue-600 mt-1">Manage and view all your travel plans</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-blue-100">
            <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-blue-600 mb-4 text-lg">You haven't created any trips yet</p>
            <Link
              to="/create-trip"
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-900">{trip.destination}</h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {trip.duration} days
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Budget:</span>
                      <span className="capitalize">{trip.budget}</span>
                    </div>
                    
                    {trip.interests.length > 0 && (
                      <div>
                        <span className="font-medium">Interests:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {trip.interests.slice(0, 3).map((interest, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs">
                              {interest}
                            </span>
                          ))}
                          {trip.interests.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              +{trip.interests.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-blue-500 mb-4">
                    Created {new Date(trip.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      to={`/trip/${trip._id}`}
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-trip/${trip._id}`}
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}