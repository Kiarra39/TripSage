import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-300/50 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40">
          <div className="text-center mb-6">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-extrabold text-sky-900">✈️ TripSage</h1>
            </Link>
            <p className="text-sky-800/80 mt-2">Welcome back!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-sky-900 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-sky-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-sky-900 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-sky-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-sky-300/60"
                required
              />
            </div>

            {error && (
              <p className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold py-3 shadow-lg hover:opacity-95 active:scale-[.99] transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sky-800/80 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-sky-900 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}