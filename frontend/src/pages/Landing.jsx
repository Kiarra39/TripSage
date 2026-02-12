import { Link } from "react-router-dom";

export default function Landing() {
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
            <p className="text-sky-800/80 mt-1">
              Plan bright, fun adventures with AI 🌍
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2 rounded-xl bg-white/80 backdrop-blur text-sky-900 font-semibold hover:bg-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-semibold hover:opacity-95 transition"
            >
              Sign Up
            </Link>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-extrabold text-sky-900 mb-6">
              Your Personal AI Travel Planner
            </h2>
            <p className="text-xl md:text-2xl text-sky-800/90 mb-8 max-w-2xl mx-auto">
              Get personalized day-by-day itineraries tailored to your budget, interests, and travel style. Save your trips and update them anytime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-bold text-lg shadow-xl hover:opacity-95 hover:scale-105 transition"
              >
                🌟 Start Planning Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur text-sky-900 font-bold text-lg shadow-xl hover:bg-white transition"
              >
                I have an account
              </Link>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-sky-900 text-lg mb-2">Personalized</h3>
                <p className="text-sky-800/80">Itineraries based on your budget and interests</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-3">💾</div>
                <h3 className="font-bold text-sky-900 text-lg mb-2">Save & Edit</h3>
                <p className="text-sky-800/80">Save your trips and update them anytime</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-sky-900 text-lg mb-2">AI-Powered</h3>
                <p className="text-sky-800/80">Smart recommendations in seconds</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="px-6 pb-6 text-sky-900/80 text-sm text-center">
          Travel smarter, discover further.
        </footer>
      </div>
    </div>
  );
}