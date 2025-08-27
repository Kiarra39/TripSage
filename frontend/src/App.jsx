import { useState } from "react";
import ItineraryForm from "./components/ItineraryForm";
import ItineraryResponse from "./components/ItineraryResponse";

export default function App() {
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-300/50 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col">
        <header className="px-6 pt-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-sky-900 drop-shadow">
            ✈️ TripSage
          </h1>
          <p className="text-sky-800/80 mt-1">
            Plan bright, fun adventures with AI 🌍
          </p>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 w-full">
          <div className="w-full max-w-3xl">
            {!itinerary ? (
              <ItineraryForm
                setItinerary={setItinerary}
                setErr={setErr}
                setLoading={setLoading}
                loading={loading}
                err={err}
              />
            ) : (
              <ItineraryResponse
                itinerary={itinerary}
                loading={loading}
                onBack={() => setItinerary("")}
              />
            )}
          </div>
        </main>

        <footer className="px-6 pb-6 text-sky-900/80 text-sm">
        Travel smarter, discover further.
        </footer>
      </div>
    </div>
  );
}
