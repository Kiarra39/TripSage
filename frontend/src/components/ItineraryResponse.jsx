import React from "react";
import ReactMarkdown from "react-markdown";

const ItineraryResponse = ({ itinerary }) => {
  if (!itinerary) {
    return (
      <p className="text-center text-gray-400 mt-8">
        No itinerary generated yet.
      </p>
    );
  }

  // Check if itinerary is a string (old format) or object (new JSON format)
  if (typeof itinerary === 'string') {
    // Handle old string format (fallback)
    const firstDayIndex = itinerary.search(/Day\s*\d+:/);
    const intro = firstDayIndex >= 0 ? itinerary.slice(0, firstDayIndex).trim() : "";
    const days = firstDayIndex >= 0
      ? itinerary.slice(firstDayIndex).split(/Day\s*\d+:/).filter(Boolean)
      : [itinerary];

    return (
      <div className="h-screen flex flex-col overflow-hidden px-4">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-4 mt-6">
          Your Travel Itinerary ✈️
        </h2>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-200 pr-2">
          {intro && (
            <div className="text-center text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto bg-emerald-50 p-4 rounded-xl shadow">
              <ReactMarkdown>{intro}</ReactMarkdown>
            </div>
          )}
          <div className="space-y-6 max-w-4xl mx-auto pb-10">
            {days.map((day, index) => (
              <div key={index} className="p-6 bg-emerald-50 rounded-2xl shadow hover:shadow-lg transition duration-300 border-l-4 border-emerald-400">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3">Day {index + 1}</h3>
                <ReactMarkdown>{day.trim()}</ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle new JSON format
  return (
    <div className="h-screen flex flex-col overflow-hidden px-4">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-4 mt-6">
        Your {itinerary.duration}-Day Trip to {itinerary.destination} ✈️
      </h2>

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-200 pr-2">
        
        {/* Summary Section */}
        <div className="text-center text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto bg-emerald-50 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-emerald-600 mb-2">Trip Overview</h3>
          <p className="mb-2"><strong>Destination:</strong> {itinerary.destination}</p>
          <p className="mb-2"><strong>Duration:</strong> {itinerary.duration} days</p>
          <p className="mb-2"><strong>Estimated Cost:</strong> {itinerary.totalEstimatedCost}</p>
          {itinerary.transportationTips && (
            <p className="mb-2"><strong>Transportation:</strong> {itinerary.transportationTips}</p>
          )}
        </div>

        {/* Days */}
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
          {itinerary.itinerary && itinerary.itinerary.map((day, index) => (
            <div
              key={index}
              className="p-6 bg-emerald-50 rounded-2xl shadow hover:shadow-lg transition duration-300 border-l-4 border-emerald-400"
            >
              <h3 className="text-2xl font-bold text-emerald-600 mb-3">
                Day {day.day || index + 1}
              </h3>
              
              {/* Morning Activity */}
              {day.activities?.morning && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-emerald-500 mb-1">🌅 Morning</h4>
                  <p className="text-gray-700">{day.activities.morning}</p>
                </div>
              )}
              
              {/* Afternoon Activity */}
              {day.activities?.afternoon && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-emerald-500 mb-1">☀️ Afternoon</h4>
                  <p className="text-gray-700">{day.activities.afternoon}</p>
                </div>
              )}
              
              {/* Evening Activity */}
              {day.activities?.evening && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-emerald-500 mb-1">🌙 Evening</h4>
                  <p className="text-gray-700">{day.activities.evening}</p>
                </div>
              )}
              
              {/* Estimated Cost */}
              {day.estimatedCost && (
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Estimated Cost:</strong> {day.estimatedCost}
                </p>
              )}
              
              {/* Accommodation */}
              {day.accommodation && (
                <p className="text-sm text-gray-600">
                  <strong>Accommodation:</strong> {day.accommodation}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Additional Recommendations */}
        {itinerary.additionalRecommendations && (
          <div className="max-w-4xl mx-auto mb-8 p-6 bg-amber-50 rounded-2xl shadow border-l-4 border-amber-400">
            <h3 className="text-xl font-semibold text-amber-600 mb-2">💡 Additional Tips</h3>
            <p className="text-gray-700">{itinerary.additionalRecommendations}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryResponse;