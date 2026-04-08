import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTrip } from "../services/api";
import ItineraryResponse from "../components/ItineraryResponse";

function WeatherCard({ destination }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1`);
        const geoData = await geoRes.json();
        const loc = geoData.results?.[0];
        if (!loc) return;
        const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true&temperature_unit=celsius`);
        const wData = await wRes.json();
        const cw = wData.current_weather;
        const codeMap = {
          0: { label: "Clear sky", icon: "☀️" },
          1: { label: "Mainly clear", icon: "🌤️" },
          2: { label: "Partly cloudy", icon: "⛅" },
          3: { label: "Overcast", icon: "☁️" },
          45: { label: "Foggy", icon: "🌫️" },
          61: { label: "Light rain", icon: "🌦️" },
          63: { label: "Rain", icon: "🌧️" },
          80: { label: "Showers", icon: "🌧️" },
          95: { label: "Thunderstorm", icon: "⛈️" },
        };
        const cond = codeMap[cw.weathercode] || { label: "Mixed conditions", icon: "🌡️" };
        setWeather({ temp: Math.round(cw.temperature), ...cond, wind: Math.round(cw.windspeed), city: loc.name, country: loc.country });
      } catch (_) {}
    }
    fetchWeather();
  }, [destination]);

  if (!weather) return null;

  return (
    <div className="bg-[#141c2e] border border-white/6 rounded-2xl p-5 mb-6 flex items-center gap-5">
      <div className="text-3xl" style={{ fontSize: 32 }}>{weather.icon}</div>
      <div className="w-px h-10 bg-white/8" />
      <div>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-2xl font-bold text-white">{weather.temp}°C</span>
          <span className="text-sm text-slate-400">{weather.label}</span>
        </div>
        <p className="text-xs text-slate-600">{weather.city}, {weather.country} · Wind {weather.wind} km/h</p>
      </div>
      <div className="ml-auto">
        <span className="text-xs text-slate-600 bg-white/4 px-3 py-1.5 rounded-full border border-white/5">Live weather</span>
      </div>
    </div>
  );
}

const budgetStyles = {
  budget: "bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20",
  moderate: "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20",
  luxury: "bg-violet-400/10 text-violet-300 ring-1 ring-violet-400/20",
};

export default function ViewTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchTrip(); }, [id]);

  const fetchTrip = async () => {
    try {
      const data = await getTrip(id);
      setTrip(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-600 text-sm">Loading itinerary…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="bg-[#141c2e] border border-red-500/15 rounded-2xl p-8 max-w-md text-center">
          <div className="text-3xl mb-4">😕</div>
          <p className="text-red-400 mb-5 text-sm">{error}</p>
          <Link to="/dashboard" className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-slate-500 hover:text-white transition-colors text-sm">← Dashboard</Link>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs">✈</div>
              <span className="text-white font-semibold text-sm tracking-tight">TripSage</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/edit-trip/${id}`}
              className="px-4 py-2 rounded-xl text-sm font-medium text-emerald-300 bg-emerald-400/8 border border-emerald-400/20 hover:bg-emerald-400/14 transition-colors"
            >
              Edit trip
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Trip header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mb-2">Your itinerary</p>
              <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">{trip.destination}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/4 border border-white/8 px-3 py-1.5 rounded-full font-medium">
                  📅 {trip.duration} {trip.duration === 1 ? "day" : "days"}
                </span>
                {trip.budget && (
                  <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${budgetStyles[trip.budget]}`}>
                    {trip.budget === "budget" ? "💰" : trip.budget === "moderate" ? "✈️" : "💎"} {trip.budget}
                  </span>
                )}
                {(trip.interests || []).map((interest, i) => (
                  <span
                    key={interest}
                    className="text-xs text-slate-400 bg-white/4 border border-white/6 px-3 py-1.5 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <WeatherCard destination={trip.destination} />

        {/* Itinerary content */}
        <ItineraryResponse itinerary={trip.itineraryData} />
      </main>
    </div>
  );
}