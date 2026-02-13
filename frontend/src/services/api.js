const API_URL = "https://tripsage-o8d9.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Itinerary (public - keep existing)
export async function generateItinerary(data) {
  try {
    const response = await fetch(`${API_URL}/itinerary/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch itinerary");
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

// Trips (protected)
export async function createTrip(tripData) {
  const response = await fetch(`${API_URL}/trips`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(tripData)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to create trip");
  return data;
}

export async function getUserTrips() {
  const response = await fetch(`${API_URL}/trips`, {
    headers: getAuthHeaders()
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch trips");
  return data;
}

export async function getTrip(id) {
  const response = await fetch(`${API_URL}/trips/${id}`, {
    headers: getAuthHeaders()
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch trip");
  return data;
}

export async function updateTrip(id, tripData) {
  const response = await fetch(`${API_URL}/trips/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(tripData)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to update trip");
  return data;
}

export async function deleteTrip(id) {
  const response = await fetch(`${API_URL}/trips/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to delete trip");
  return data;
}