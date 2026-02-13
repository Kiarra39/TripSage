import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50">
      {/* Header */}
      <header className="px-6 py-5 flex justify-between items-center border-b border-blue-100 bg-white/70 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">TripSage</h1>
          <p className="text-sm text-blue-600">AI-Powered Travel Planning</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
            Plan Your Perfect Trip
          </h2>
          <p className="text-xl text-blue-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get personalized day-by-day itineraries powered by AI. Tailored to your budget, 
            interests, and travel preferences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow-md"
            >
              Start Planning
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-lg bg-white text-blue-900 font-semibold text-lg hover:bg-blue-50 transition shadow-md border border-blue-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-bold text-blue-900 text-lg mb-2">Personalized Itineraries</h3>
            <p className="text-blue-700">Custom plans based on your budget, interests, and travel style</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="font-bold text-emerald-900 text-lg mb-2">Save & Manage Trips</h3>
            <p className="text-emerald-700">Store unlimited trips and update them anytime you need</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-amber-900 text-lg mb-2">Instant Generation</h3>
            <p className="text-amber-700">AI-powered recommendations generated in seconds</p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-20 bg-white rounded-2xl p-10 shadow-sm border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Everything You Need</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Day-by-Day Planning</h4>
                <p className="text-blue-600 text-sm">Detailed activities for morning, afternoon, and evening</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Budget Estimates</h4>
                <p className="text-blue-600 text-sm">Cost breakdowns for each day and overall trip</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Accommodation Suggestions</h4>
                <p className="text-blue-600 text-sm">Hotel recommendations based on your budget</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Transportation Tips</h4>
                <p className="text-blue-600 text-sm">Getting around advice for your destination</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-blue-100 mt-20 py-6 text-center text-blue-600 text-sm bg-white/50">
        <p>&copy; 2024 TripSage. Travel smarter, explore further.</p>
      </footer>
    </div>
  );
}