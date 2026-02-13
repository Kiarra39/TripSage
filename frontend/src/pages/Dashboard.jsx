import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserTrips, deleteTrip } from "../services/api";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ new
  const [tripToDelete, setTripToDelete] = useState(null); // ✅ new
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

  const confirmDelete = (trip) => {
    setTripToDelete(trip);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
     await deleteTrip(tripToDelete._id);
await fetchTrips();

      setShowDeleteModal(false);
      setTripToDelete(null);
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
        <h2 className="text-3xl font-bold text-blue-900 mb-6">My Trips</h2>

        {trips.map((trip) => (
          <div key={trip._id} className="bg-white p-6 rounded-xl shadow mb-4">
            <h3 className="text-xl font-bold text-blue-900">{trip.destination}</h3>
            <p className="text-blue-600 mb-3">{trip.duration} days</p>

            <div className="flex gap-3">
              <Link
                to={`/trip/${trip._id}`}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                View
              </Link>
              <Link
                to={`/edit-trip/${trip._id}`}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => confirmDelete(trip)} // ✅ replaced
                className="px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* ✅ Styled Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              Delete Trip?
            </h3>
            <p className="text-blue-700 mb-6">
              Are you sure you want to delete your trip to{" "}
              <span className="font-semibold">{tripToDelete?.destination}</span>?
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
