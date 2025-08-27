export async function generateItinerary(data) {
  try {
    const response = await fetch("http://localhost:5000/api/itinerary/generate", {
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
