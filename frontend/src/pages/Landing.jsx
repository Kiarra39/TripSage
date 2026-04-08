import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="px-8 py-5 flex justify-between items-center border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">✈ TripSage</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="px-5 py-2 rounded-lg text-slate-300 text-sm font-medium hover:text-white hover:bg-white/5 transition">
            Login
          </Link>
          <Link to="/register" className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition shadow-lg shadow-blue-900/30">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-8 pt-24 pb-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            AI-Powered Travel Planning
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Plan Your Perfect<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Adventure</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Get personalized day-by-day itineraries powered by AI — tailored to your budget, interests, and travel style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-500 transition shadow-xl shadow-blue-900/30">
              Start Planning Free
            </Link>
            <Link to="/login" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-base hover:bg-white/10 transition">
              Sign In
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {[
            { icon: "🗺️", color: "bg-blue-500/10 border-blue-500/15", iconBg: "bg-blue-500/15", title: "Personalized Itineraries", desc: "Custom plans based on your budget, interests, and travel style." },
            { icon: "💾", color: "bg-emerald-500/10 border-emerald-500/15", iconBg: "bg-emerald-500/15", title: "Save & Manage Trips", desc: "Store unlimited trips and update them anytime you need." },
            { icon: "⚡", color: "bg-amber-500/10 border-amber-500/15", iconBg: "bg-amber-500/15", title: "Instant Generation", desc: "AI-powered recommendations generated in seconds." },
          ].map(({ icon, color, iconBg, title, desc }) => (
            <div key={title} className={`rounded-2xl p-7 border ${color} bg-[#1e293b]`}>
              <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center text-xl mb-5`}>{icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Feature List */}
        <div className="bg-[#1e293b] border border-white/5 rounded-2xl p-10">
          <h3 className="text-xl font-bold text-white mb-8 text-center">Everything You Need</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Day-by-Day Planning", desc: "Detailed activities for morning, afternoon, and evening" },
              { title: "Budget Estimates", desc: "Cost breakdowns for each day and the full trip" },
              { title: "Accommodation Suggestions", desc: "Hotel recommendations based on your budget" },
              { title: "Transportation Tips", desc: "Getting around advice for your destination" },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-6 h-6 bg-emerald-500/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{title}</h4>
                  <p className="text-slate-400 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-7 text-center text-slate-500 text-sm bg-[#0f172a]">
        © 2024 TripSage — Travel smarter, explore further.
      </footer>
    </div>
  );
}