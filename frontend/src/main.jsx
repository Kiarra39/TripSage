import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import ViewTrip from "./pages/ViewTrip";
import EditTrip from "./pages/EditTrip";
import "./index.css";

// Protected Route Component
// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200">
        <div className="h-12 w-12 rounded-full border-4 border-sky-900/30 border-t-sky-900 animate-spin" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

// Public Route (redirect to dashboard if logged in)
// eslint-disable-next-line react-refresh/only-export-components
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 via-sky-200 to-emerald-200">
        <div className="h-12 w-12 rounded-full border-4 border-sky-900/30 border-t-sky-900 animate-spin" />
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" /> : children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-trip" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
          <Route path="/trip/:id" element={<ProtectedRoute><ViewTrip /></ProtectedRoute>} />
          <Route path="/edit-trip/:id" element={<ProtectedRoute><EditTrip /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);