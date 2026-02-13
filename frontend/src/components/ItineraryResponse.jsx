import React from "react";
import ReactMarkdown from "react-markdown";

const ItineraryResponse = ({ itinerary }) => {
  if (!itinerary) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-blue-100">
        <p className="text-blue-600">No itinerary generated yet.</p>
      </div>
    );
  }

  // Handle old string format (fallback)
  if (typeof itinerary === 'string') {
    const firstDayIndex = itinerary.search(/Day\s*\d+:/);
    const intro = firstDayIndex >= 0 ? itinerary.slice(0, firstDayIndex).trim() : "";
    const days = firstDayIndex >= 0
      ? itinerary.slice(firstDayIndex).split(/Day\s*\d+:/).filter(Boolean)
      : [itinerary];

    return (
      <div className="space-y-6">
        {intro && (
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <ReactMarkdown>{intro}</ReactMarkdown>
          </div>
        )}
        <div className="space-y-4">
          {days.map((day, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Day {index + 1}</h3>
              <ReactMarkdown>{day.trim()}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle new JSON format
  return (
    <div className="space-y-6">
      {/* Trip Overview */}
      <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          {itinerary.duration}-Day Trip to {itinerary.destination}
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-blue-700">
          <div>
            <span className="font-semibold">Duration:</span> {itinerary.duration} days
          </div>
          <div>
            <span className="font-semibold">Estimated Cost:</span> {itinerary.totalEstimatedCost}
          </div>
          {itinerary.transportationTips && (
            <div className="md:col-span-2">
              <span className="font-semibold">Transportation:</span> {itinerary.transportationTips}
            </div>
          )}
        </div>
      </div>

      {/* Daily Itinerary */}
      <div className="space-y-4">
        {itinerary.itinerary && itinerary.itinerary.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-4 pb-3 border-b border-blue-100">
              Day {day.day || index + 1}
            </h3>
            
            {/* Morning */}
            {day.activities?.morning && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide">Morning</h4>
                <p className="text-blue-900">{day.activities.morning}</p>
              </div>
            )}
            
            {/* Afternoon */}
            {day.activities?.afternoon && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide">Afternoon</h4>
                <p className="text-blue-900">{day.activities.afternoon}</p>
              </div>
            )}
            
            {/* Evening */}
            {day.activities?.evening && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide">Evening</h4>
                <p className="text-blue-900">{day.activities.evening}</p>
              </div>
            )}
            
            {/* Cost and Accommodation */}
            <div className="mt-4 pt-4 border-t border-blue-100 space-y-1 text-sm text-blue-600">
              {day.estimatedCost && (
                <p><span className="font-semibold">Estimated Cost:</span> {day.estimatedCost}</p>
              )}
              {day.accommodation && (
                <p><span className="font-semibold">Accommodation:</span> {day.accommodation}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Recommendations */}
      {itinerary.additionalRecommendations && (
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Additional Tips</h3>
          <p className="text-amber-800">{itinerary.additionalRecommendations}</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryResponse;