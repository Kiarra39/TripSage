# 🌍 TripSage: Your Smart AI Travel Itinerary Assistant

TripSage is a travel planning assistant powered by LLMs that helps users generate personalized travel itineraries based on their preferences. It uses a combination of **Prompt Engineering**, **Structured Output**, **Function Calling**, and **Retrieval-Augmented Generation (RAG)** to provide accurate, relevant, and customized trip plans.

---

##  Features

-  Personalized travel itinerary based on destination, dates, budget, interests
-  Real-time hotel, activity, and flight suggestions (via function calls)
-  Reliable information from external sources (using RAG)
-  Clean and structured output for easy reading or exporting
-  Option to edit/swap days or destinations

---

##  Project Concept

**Goal:** To create a user-friendly travel planning assistant that generates full-day-by-day itineraries based on the user’s input, enriched by real-time data and structured output formatting.

Example flow:
1. User tells TripSage: *"Plan a 5-day budget-friendly trip to Bali with adventure activities."*
2. The system generates a structured itinerary, using real-time data (RAG + Function Calling), and formats it cleanly for export or viewing.
3. The user can ask to revise Day 3 or replace a destination or activity.

---

##  Concepts Implemented

### 1.  Prompting

Prompting is used to interact naturally with the LLM. Carefully designed prompts guide the AI to understand user preferences such as:
- Destination
- Duration
- Interests (beaches, museums, food, hiking, etc.)
- Budget

Example prompt:
> "You are a travel planning assistant. The user wants a 4-day trip to Tokyo focused on food and culture under ₹50,000. Generate a daily itinerary."

This guides the model to output relevant travel content.

---

### 2.  Structured Output

Instead of raw, unformatted text, the AI is prompted to respond in a clear, structured format:

- Each day broken into **Morning**, **Afternoon**, and **Evening**
- Estimated cost
- Location names
- Links (optionally)
- Total budget summary

This makes it easier to:
- Present on UI
- Convert to PDF
- Export to calendar apps or trip planners

---

### 3.  Function Calling

TripSage uses function calling to fetch **real-time information** like:
- Top-rated hotels
- Flight availability
- Weather forecasts
- Entry fees or bookings

The LLM does not guess this information. Instead, it calls functions like:
- `getHotels(location, budget)`
- `getFlights(origin, destination, date)`
- `getWeather(date, location)`

This ensures factual and live results, improving accuracy.

---

### 4.  RAG (Retrieval-Augmented Generation)

RAG is used to bring in **external travel knowledge** not stored in the model’s internal memory. For example:
- Recent travel blogs
- Latest travel restrictions
- Event calendars
- Currency rates

The process:
- Search reliable travel sources
- Retrieve the top relevant documents
- Feed them into the model as context
- Then ask the model to answer or generate with this context

This makes the itinerary **current**, **factual**, and **tailored**.

---

##  Tech Stack 

- Frontend: React + Tailwind
- Backend: Node.js / Express
- AI Layer: OpenAI (GPT-4 or similar)
- RAG Source: Custom search pipeline (Bing API or travel blogs)
- Deployment: Vercel (frontend) + Render (backend)

---

##  Example Use Case

User: *“Plan a 7-day solo backpacking trip to Vietnam under ₹40,000 with a mix of culture, food, and nature.”*

TripSage responds with:
- Day-wise plan (Hanoi → Ninh Binh → Hoi An)
- Morning/Evening activities
- Costs per day
- Hostel recommendations
- Weather info
- Local transport options

---

