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

  // Split intro from days
  const firstDayIndex = itinerary.search(/Day\s*\d+:/);
  const intro = firstDayIndex >= 0 ? itinerary.slice(0, firstDayIndex).trim() : "";
  const days = firstDayIndex >= 0
    ? itinerary.slice(firstDayIndex).split(/Day\s*\d+:/).filter(Boolean)
    : [itinerary];

  return (
    <div className="h-screen flex flex-col overflow-hidden px-4">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-4 mt-6">
        Your Travel Itinerary ✈️
      </h2>

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-200 pr-2">
        
        {/* Intro / Description */}
        {intro && (
          <div className="text-center text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto bg-emerald-50 p-4 rounded-xl shadow">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-emerald-600 mb-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-emerald-500 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              }}
            >
              {intro}
            </ReactMarkdown>
          </div>
        )}

        {/* Days */}
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
          {days.map((day, index) => (
            <div
              key={index}
              className="p-6 bg-emerald-50 rounded-2xl shadow hover:shadow-lg transition duration-300 border-l-4 border-emerald-400"
            >
              <h3 className="text-2xl font-bold text-emerald-600 mb-3">
                Day {index + 1}
              </h3>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-emerald-600" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-emerald-500" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-emerald-400" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2 text-gray-700" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-4 list-disc text-gray-700" {...props} />,
                }}
              >
                {day.trim()}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryResponse;
