import React from "react";

const ItineraryResponse = ({ itinerary }) => {
  if (!itinerary) return null;

  // Handle string fallback
  if (typeof itinerary === "string") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-[#141c2e] border border-white/5 rounded-xl p-6 custom-scroll overflow-y-auto max-h-[calc(100vh-80px)]">
          <p className="text-slate-300 whitespace-pre-line">
            {itinerary}
          </p>
        </div>

        {/* Scrollbar Styling */}
        <style>
          {`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }

            .custom-scroll::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scroll::-webkit-scrollbar-thumb {
              background: #334155;
              border-radius: 10px;
            }

            .custom-scroll::-webkit-scrollbar-thumb:hover {
              background: #475569;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Scrollable wrapper */}
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] custom-scroll pr-2">
        
        {/* Overview */}
        <div className="bg-[#141c2e] border border-white/5 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-2">
            {itinerary.destination}
          </h2>

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span>{itinerary.duration} days</span>
            <span>{itinerary.totalEstimatedCost}</span>
          </div>

          {itinerary.transportationTips && (
            <p className="text-xs text-slate-500 mt-3">
              {itinerary.transportationTips}
            </p>
          )}
        </div>

        {/* Days */}
        <div className="space-y-3">
          {itinerary.itinerary?.map((day, index) => (
            <DayCard key={index} day={day} index={index} />
          ))}
        </div>

        {/* Tips */}
        {itinerary.additionalRecommendations && (
          <div className="bg-[#141c2e] border border-white/5 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-2">
              Tips
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {itinerary.additionalRecommendations}
            </p>
          </div>
        )}
      </div>

      {/* Scrollbar Styling (ONLY ONCE HERE) */}
      <style>
        {`
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scroll::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 10px;
          }

          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: #475569;
          }
        `}
      </style>
    </div>
  );
};

/* ---------------- Day Card ---------------- */

const DayCard = ({ day, index }) => {
  return (
    <div className="bg-[#141c2e] border border-white/5 rounded-xl p-5">
      
      {/* Header */}
      <h3 className="text-sm font-semibold text-white mb-3">
        Day {day.day || index + 1}
      </h3>

      {/* Activities */}
      <div className="space-y-3 text-sm text-slate-300">
        {day.activities?.morning && (
          <Section title="Morning" content={day.activities.morning} />
        )}

        {day.activities?.afternoon && (
          <Section title="Afternoon" content={day.activities.afternoon} />
        )}

        {day.activities?.evening && (
          <Section title="Evening" content={day.activities.evening} />
        )}
      </div>

      {/* Footer */}
      {(day.estimatedCost || day.accommodation) && (
        <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-500 space-y-1">
          {day.estimatedCost && <p>{day.estimatedCost}</p>}
          {day.accommodation && <p>{day.accommodation}</p>}
        </div>
      )}
    </div>
  );
};

/* ---------------- Section ---------------- */

const Section = ({ title, content }) => {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-1">{title}</p>
      <p className="leading-relaxed">{content}</p>
    </div>
  );
};

export default ItineraryResponse;